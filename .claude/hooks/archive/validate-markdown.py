#!/usr/bin/env python3
"""
Sistema de Validação de Markdown para Claude Code
Intercepta operações Write/Edit e valida conteúdo markdown antes da escrita
"""

import json
import sys
import re
from typing import Dict, List, Any, Tuple
from pathlib import Path

class MarkdownValidator:
    def __init__(self):
        self.errors: List[Dict[str, Any]] = []
        self.warnings: List[Dict[str, Any]] = []
        self.fixes_applied: List[str] = []

    def validate(self, file_path: str, content: str) -> Tuple[bool, str]:
        """
        Valida e corrige conteúdo markdown

        Returns:
            (is_valid, corrected_content)
        """
        # Resetar estado
        self.errors = []
        self.warnings = []
        self.fixes_applied = []

        # 1. Validação de Sintaxe
        content = self._validate_syntax(content)

        # 2. Validação de Estrutura
        self._validate_structure(content)

        # 3. Validação de Referências
        self._validate_references(content, file_path)

        # 4. Validação de Metadados
        self._validate_metadata(content)

        # Retornar resultado
        has_critical_errors = any(e['severity'] == 'error' and e.get('blocking', False)
                                  for e in self.errors)

        return (not has_critical_errors, content)

    def _validate_syntax(self, content: str) -> str:
        """Valida e corrige sintaxe markdown"""

        # 1. Headers sem espaço (#Header → # Header)
        fixed_content = re.sub(r'^(#{1,6})([^\s#])', r'\1 \2', content, flags=re.MULTILINE)
        if fixed_content != content:
            self.fixes_applied.append("Header spacing corrigido")
            content = fixed_content

        # 2. Code blocks não fechados
        code_blocks = content.count('```')
        if code_blocks % 2 != 0:
            self.errors.append({
                'type': 'syntax',
                'severity': 'error',
                'blocking': True,
                'message': 'Code block não fechado detectado',
                'line': content.count('\n') + 1
            })
            # Tentar corrigir adicionando ``` no final
            content += '\n```\n'
            self.fixes_applied.append("Code block fechado automaticamente")

        # 3. Links vazios
        empty_links = re.findall(r'\[([^\]]*)\]\(([^)]*)\)', content)
        for text, url in empty_links:
            line = content[:content.find(f'[{text}]({url})')].count('\n') + 1

            if not text.strip():
                self.errors.append({
                    'type': 'syntax',
                    'severity': 'error',
                    'message': 'Link sem texto',
                    'line': line
                })

            if not url.strip():
                self.errors.append({
                    'type': 'syntax',
                    'severity': 'error',
                    'message': 'Link sem URL',
                    'line': line
                })

        # 4. Listas com indentação inconsistente
        lines = content.split('\n')
        for i, line in enumerate(lines):
            list_match = re.match(r'^(\s*)([-*+]|\d+\.)\s', line)
            if list_match:
                indent = len(list_match.group(1))
                if indent % 2 != 0:
                    # Corrigir indentação
                    new_indent = (indent // 2) * 2
                    lines[i] = ' ' * new_indent + line.lstrip()
                    self.fixes_applied.append(f"Indentação de lista corrigida (linha {i+1})")

        content = '\n'.join(lines)

        # 5. Trailing whitespace
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if line.rstrip() != line:
                lines[i] = line.rstrip()

        fixed_content = '\n'.join(lines)
        if fixed_content != content:
            self.fixes_applied.append("Trailing whitespace removido")
            content = fixed_content

        return content

    def _validate_structure(self, content: str):
        """Valida estrutura do documento"""

        # 1. Verificar H1
        h1_count = len(re.findall(r'^# [^#]', content, re.MULTILINE))

        if h1_count == 0:
            self.errors.append({
                'type': 'structure',
                'severity': 'error',
                'message': 'Documento deve ter exatamente um header H1',
                'line': 1
            })
        elif h1_count > 1:
            self.warnings.append({
                'type': 'structure',
                'severity': 'warning',
                'message': f'Documento tem {h1_count} headers H1 (recomendado: 1)'
            })

        # 2. Verificar hierarquia de headers
        headers = re.findall(r'^(#{1,6})\s', content, re.MULTILINE)
        prev_level = 0

        for i, header in enumerate(headers):
            level = len(header)

            if prev_level > 0 and level > prev_level + 1:
                self.warnings.append({
                    'type': 'structure',
                    'severity': 'warning',
                    'message': f'Salto de hierarquia: H{prev_level} para H{level}'
                })

            prev_level = level

    def _validate_references(self, content: str, file_path: str):
        """Valida links e referências"""

        # 1. Links internos
        internal_links = re.findall(r'\[([^\]]+)\]\(((?:\./|\.\.\/|\/)[^)]+)\)', content)

        base_dir = Path(file_path).parent

        for text, url in internal_links:
            # Remover âncora
            clean_url = url.split('#')[0]

            try:
                target_path = (base_dir / clean_url).resolve()

                if not target_path.exists():
                    line = content[:content.find(f'[{text}]({url})')].count('\n') + 1
                    self.errors.append({
                        'type': 'reference',
                        'severity': 'error',
                        'message': f'Link quebrado: {url}',
                        'line': line
                    })
            except Exception as e:
                pass  # Ignorar erros de path resolution

        # 2. Âncoras
        anchor_refs = re.findall(r'\[([^\]]+)\]\(#([^)]+)\)', content)

        # Extrair headers válidos
        valid_anchors = []
        for header in re.findall(r'^#{1,6}\s+(.+)$', content, re.MULTILINE):
            # Converter para formato de âncora GitHub
            anchor = header.lower()
            anchor = re.sub(r'[^\w\s-]', '', anchor)
            anchor = re.sub(r'\s+', '-', anchor)
            valid_anchors.append(anchor)

        for text, anchor in anchor_refs:
            if anchor not in valid_anchors:
                line = content[:content.find(f'[{text}](#{anchor})')].count('\n') + 1
                self.warnings.append({
                    'type': 'reference',
                    'severity': 'warning',
                    'message': f'Âncora não encontrada: #{anchor}',
                    'line': line
                })

    def _validate_metadata(self, content: str):
        """Valida YAML frontmatter"""

        frontmatter_match = re.match(r'^---\n([\s\S]*?)\n---', content)

        if frontmatter_match:
            try:
                import yaml
                frontmatter = frontmatter_match.group(1)
                metadata = yaml.safe_load(frontmatter)

                # Validar campos comuns
                if isinstance(metadata, dict):
                    # Campos recomendados
                    recommended = ['name', 'version', 'description']
                    missing = [f for f in recommended if f not in metadata]

                    if missing:
                        self.warnings.append({
                            'type': 'metadata',
                            'severity': 'info',
                            'message': f'Campos recomendados faltando: {", ".join(missing)}'
                        })
            except Exception as e:
                self.errors.append({
                    'type': 'metadata',
                    'severity': 'error',
                    'message': f'Erro ao parsear YAML frontmatter: {e}'
                })

    def get_report(self) -> Dict[str, Any]:
        """Retorna relatório de validação"""
        return {
            'errors': self.errors,
            'warnings': self.warnings,
            'fixes_applied': self.fixes_applied,
            'total_issues': len(self.errors) + len(self.warnings),
            'critical_errors': len([e for e in self.errors if e.get('blocking', False)])
        }


def main():
    """
    Entry point para hook do Claude Code

    Recebe JSON via stdin com estrutura:
    {
        "tool_name": "Write" | "Edit",
        "tool_input": {
            "file_path": "caminho/arquivo.md",
            "content": "conteúdo markdown"
        }
    }

    Retorna JSON via stdout:
    {
        "decision": "allow" | "block" | "modify",
        "reason": "Mensagem explicativa",
        "modified_input": { ... } (se decision == "modify")
    }
    """
    try:
        # Ler input do hook
        hook_input = json.load(sys.stdin)

        tool_name = hook_input.get('tool_name', '')
        tool_input = hook_input.get('tool_input', {})

        file_path = tool_input.get('file_path', '')
        content = tool_input.get('content', '')

        # Apenas validar arquivos markdown
        if not file_path.endswith('.md'):
            # Permitir outros arquivos sem validação
            result = {
                'decision': 'allow',
                'reason': 'Não é arquivo markdown, validação não aplicada'
            }
            json.dump(result, sys.stdout, indent=2)
            sys.exit(0)

        # Validar markdown
        validator = MarkdownValidator()
        is_valid, corrected_content = validator.validate(file_path, content)
        report = validator.get_report()

        # Decidir ação
        if report['critical_errors'] > 0:
            # Bloquear escrita
            error_messages = [e['message'] for e in report['errors'] if e.get('blocking', False)]
            result = {
                'decision': 'block',
                'reason': f"❌ Validação bloqueada: {report['critical_errors']} erro(s) crítico(s) encontrado(s)",
                'errors': error_messages,
                'report': report
            }

            # Escrever para stderr para logs
            print(f"\n❌ VALIDAÇÃO FALHOU: {file_path}", file=sys.stderr)
            print(f"Erros críticos: {report['critical_errors']}", file=sys.stderr)
            for error in error_messages:
                print(f"  - {error}", file=sys.stderr)

            json.dump(result, sys.stdout, indent=2)
            sys.exit(2)  # Exit code 2 = block

        elif corrected_content != content:
            # Modificar conteúdo
            result = {
                'decision': 'modify',
                'reason': f"✅ Auto-correções aplicadas: {len(report['fixes_applied'])} fix(es)",
                'fixes': report['fixes_applied'],
                'warnings': len(report['warnings']),
                'modified_input': {
                    **tool_input,
                    'content': corrected_content
                }
            }

            # Log para stderr
            print(f"\n✅ VALIDAÇÃO OK (com correções): {file_path}", file=sys.stderr)
            print(f"Correções aplicadas: {len(report['fixes_applied'])}", file=sys.stderr)
            for fix in report['fixes_applied']:
                print(f"  ✓ {fix}", file=sys.stderr)

            if report['warnings']:
                print(f"⚠️  Avisos: {len(report['warnings'])}", file=sys.stderr)

            json.dump(result, sys.stdout, indent=2)
            sys.exit(0)

        else:
            # Permitir sem modificações
            result = {
                'decision': 'allow',
                'reason': '✅ Validação passou sem correções necessárias',
                'warnings': len(report['warnings'])
            }

            print(f"\n✅ VALIDAÇÃO OK: {file_path}", file=sys.stderr)
            if report['warnings']:
                print(f"⚠️  Avisos: {len(report['warnings'])}", file=sys.stderr)

            json.dump(result, sys.stdout, indent=2)
            sys.exit(0)

    except Exception as e:
        # Em caso de erro, permitir operação mas logar
        error_result = {
            'decision': 'allow',
            'reason': f'⚠️  Erro no validador: {str(e)} (operação permitida)',
            'error': str(e)
        }

        print(f"\n⚠️  ERRO NO VALIDADOR: {e}", file=sys.stderr)
        print("Operação permitida apesar do erro", file=sys.stderr)

        json.dump(error_result, sys.stdout, indent=2)
        sys.exit(0)


if __name__ == '__main__':
    main()
