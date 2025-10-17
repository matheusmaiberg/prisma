#!/usr/bin/env python3
"""
Hook PreToolUse para invocar regras do agente documentador
Intercepta operações Write/Edit em arquivos markdown e valida conforme padrões estabelecidos
"""

import json
import sys
import re
from pathlib import Path
from typing import Dict, List, Any, Tuple


class DocumentadorHook:
    """Hook que aplica regras do agente documentador antes de criar arquivos markdown"""

    def __init__(self):
        self.errors: List[str] = []
        self.warnings: List[str] = []
        self.doc_type: str = ""
        self.needs_validation: bool = False

    def analyze_file_path(self, file_path: str) -> bool:
        """
        Determina se o arquivo precisa validação do documentador

        Regras de escopo:
        - docs/ -> SIM (documentação de usuário)
        - .prisma/projeto/ -> SIM (documentação técnica)
        - .prisma/especificacoes/ -> NÃO (criados por outros agentes)
        - .prisma/relatorios/ -> NÃO (relatórios temporários)
        - .prisma/comandos/ -> NÃO (comandos do sistema)
        - .prisma/agentes/ -> NÃO (definições de agentes)
        - .claude/ -> NÃO (configurações do Claude Code)
        """
        file_path_normalized = file_path.replace('\\', '/')

        # Documentação de usuário (sempre valida)
        if file_path_normalized.startswith('docs/'):
            self.doc_type = "user-documentation"
            self.needs_validation = True
            return True

        # Documentação técnica (valida, WORKAROUND até arquiteto existir)
        if file_path_normalized.startswith('.prisma/projeto/'):
            self.doc_type = "technical-documentation"
            self.needs_validation = True
            return True

        # ADRs (decisões arquiteturais)
        if '/decisions/' in file_path_normalized or 'docs/decisions/' in file_path_normalized:
            self.doc_type = "architectural-decision-record"
            self.needs_validation = True
            return True

        # Arquivos fora do escopo do documentador
        return False

    def validate_basic_markdown(self, content: str) -> Tuple[List[str], List[str]]:
        """
        Validação básica de markdown para detectar erros críticos
        Retorna: (errors, warnings)
        """
        errors = []
        warnings = []

        # 1. Headers sem espaço (#Header em vez de # Header)
        if re.search(r'^#{1,6}[^#\s]', content, re.MULTILINE):
            warnings.append("Header sem espaço após # detectado (ex: '#Header' deveria ser '# Header')")

        # 2. Code blocks não fechados
        code_blocks = content.count('```')
        if code_blocks % 2 != 0:
            errors.append(f"Code block não fechado detectado ({code_blocks} marcadores ``` encontrados)")

        # 3. Links vazios ou malformados
        link_pattern = r'\[([^\]]*)\]\(([^)]*)\)'
        links = re.findall(link_pattern, content)

        for text, url in links:
            if not text.strip():
                errors.append("Link sem texto detectado: [](...)")
            if not url.strip():
                errors.append(f"Link sem URL detectado: [{text}]()")

        # 4. Headers múltiplos H1 (warning, não erro)
        h1_count = len(re.findall(r'^# [^#]', content, re.MULTILINE))
        if h1_count == 0:
            warnings.append("Nenhum header H1 encontrado (recomendado: exatamente 1)")
        elif h1_count > 1:
            warnings.append(f"Múltiplos headers H1 encontrados ({h1_count}), recomendado: 1")

        # 5. Frontmatter YAML malformado
        frontmatter_match = re.match(r'^---\n([\s\S]*?)\n---', content)
        if frontmatter_match:
            try:
                import yaml
                yaml.safe_load(frontmatter_match.group(1))
            except yaml.YAMLError as e:
                errors.append(f"YAML frontmatter inválido: {e}")
            except ImportError:
                # yaml não instalado, skip validação
                pass

        return errors, warnings

    def get_documentation_rules(self, file_path: str) -> Dict[str, Any]:
        """Retorna regras de documentação baseadas no tipo e localização do arquivo"""

        location_map = {
            "user-documentation": {
                "location": "docs/ - Application user documentation",
                "purpose": "Documentar funcionalidades para usuários finais",
                "audience": "End users, API consumers, contributors",
                "standards_ref": ".prisma/agentes/documentador.md (seção: docs/)"
            },
            "technical-documentation": {
                "location": ".prisma/projeto/ - Technical/project documentation",
                "purpose": "Documentar arquitetura e padrões para desenvolvedores",
                "audience": "Developers, architects, AI agents",
                "standards_ref": ".prisma/agentes/documentador.md (seção: .prisma/projeto/)",
                "note": "WORKAROUND: documentador assume até arquiteto ser implementado"
            },
            "architectural-decision-record": {
                "location": "docs/decisions/ - Architecture Decision Records",
                "purpose": "Registrar decisões arquiteturais importantes",
                "audience": "Future team, decision makers, architects",
                "standards_ref": ".prisma/agentes/documentador.md (seção: ADR Template)",
                "template": "ADR-XXX-decision-slug.md"
            }
        }

        return location_map.get(self.doc_type, {
            "location": "Unknown",
            "purpose": "Verificar com documentador",
            "audience": "Unknown"
        })

    def process_hook(self, hook_input: Dict[str, Any]) -> Dict[str, Any]:
        """Processa o hook e retorna decisão"""

        tool_name = hook_input.get('tool_name', '')
        tool_input = hook_input.get('tool_input', {})

        file_path = tool_input.get('file_path', '')
        content = tool_input.get('content', '')

        # Verificar se é arquivo markdown
        if not file_path.endswith('.md'):
            return {
                'decision': 'allow',
                'reason': 'Não é arquivo markdown, validação não aplicada'
            }

        # Verificar se está no escopo do documentador
        if not self.analyze_file_path(file_path):
            return {
                'decision': 'allow',
                'reason': 'Arquivo fora do escopo de documentação (especificações, relatórios, comandos, agentes)'
            }

        # Validação básica de markdown
        errors, warnings = self.validate_basic_markdown(content)

        # Se há erros críticos, bloquear operação
        if errors:
            return {
                'decision': 'block',
                'reason': f'[BLOCKED] {len(errors)} erro(s) critico(s) de markdown detectado(s). Corrija antes de prosseguir.',
                'errors': errors,
                'warnings': warnings,
                'recommendation': 'Corrija os erros de sintaxe markdown antes de criar o arquivo.',
                'documentation_rules': self.get_documentation_rules(file_path)
            }

        # Arquivo pode ser criado, mas avisar sobre validação completa pelo documentador
        doc_rules = self.get_documentation_rules(file_path)

        return {
            'decision': 'allow',
            'reason': f'[ALLOWED] Arquivo de {self.doc_type} sera criado. Validacao basica passou.',
            'warnings': warnings if warnings else None,
            'recommendation': (
                f'PROXIMO PASSO: Execute o agente documentador para validacao completa.\n\n'
                f'O documentador verificara:\n'
                f'  - Estrutura e organizacao ({doc_rules["location"]})\n'
                f'  - Padroes de qualidade (headers, links, exemplos)\n'
                f'  - Cross-references com outras documentacoes\n'
                f'  - Conformidade com standards do projeto\n\n'
                f'Audiencia: {doc_rules["audience"]}\n'
                f'Ver regras completas em: {doc_rules["standards_ref"]}'
            ),
            'next_action': {
                'agent': 'documentador',
                'when': 'after-write',
                'purpose': 'Validar estrutura, localizacao, padroes de qualidade e integracao'
            },
            'documentation_rules': doc_rules
        }


def main():
    """Entry point do hook"""
    try:
        # Ler input JSON do Claude Code
        hook_input = json.load(sys.stdin)

        # Processar hook
        hook = DocumentadorHook()
        result = hook.process_hook(hook_input)

        # Determinar exit code
        exit_code = 0
        if result['decision'] == 'block':
            exit_code = 2  # Block operation

        # Output JSON para stdout (ensure_ascii=True for Windows compatibility)
        json.dump(result, sys.stdout, indent=2, ensure_ascii=True)

        # Log para stderr
        if result['decision'] == 'block':
            print(f"\n[BLOCKED] HOOK: {result['reason']}", file=sys.stderr)
            for error in result.get('errors', []):
                print(f"  - {error}", file=sys.stderr)
        elif result.get('warnings'):
            print(f"\n[WARNING] HOOK: {result['reason']}", file=sys.stderr)
            for warning in result.get('warnings', []):
                print(f"  - {warning}", file=sys.stderr)
        else:
            print(f"\n[OK] HOOK: {result['reason']}", file=sys.stderr)

        sys.exit(exit_code)

    except Exception as e:
        # Em caso de erro no hook, permitir operação mas logar
        error_result = {
            'decision': 'allow',
            'reason': f'[WARNING] Erro no hook: {str(e)} (operacao permitida)',
            'error': str(e)
        }

        print(f"\n[ERROR] HOOK: {e}", file=sys.stderr)
        print("Operacao permitida apesar do erro", file=sys.stderr)

        json.dump(error_result, sys.stdout, indent=2, ensure_ascii=True)
        sys.exit(0)


if __name__ == '__main__':
    main()
