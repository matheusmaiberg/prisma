# Sistema de Hooks - Integração com Agente Documentador

## Visão Geral

Este sistema implementa hooks PreToolUse do Claude Code para aplicar automaticamente as regras do **agente documentador** antes de criar ou editar arquivos markdown.

## Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│ Claude Code - Write/Edit Tool                               │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ PreToolUse Hook (invoke-documentador.py)                    │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 1. Identificar tipo de arquivo                          │ │
│ │ 2. Determinar se está no escopo do documentador        │ │
│ │ 3. Validação básica de markdown (sintaxe)              │ │
│ │ 4. Decidir: allow / block / modify                     │ │
│ └─────────────────────────────────────────────────────────┘ │
└───────────────────────┬─────────────────────────────────────┘
                        │
            ┌───────────┴───────────┐
            │                       │
            ▼                       ▼
     ┌────────────┐         ┌─────────────┐
     │   BLOCK    │         │    ALLOW    │
     │ (exit 2)   │         │  (exit 0)   │
     └────────────┘         └──────┬──────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │ Arquivo criado               │
                    │ + Recomendação para executar │
                    │   agente documentador        │
                    └──────────────────────────────┘
```

## Regras de Escopo

O hook aplica validação apenas para arquivos markdown nas seguintes localizações:

### ✅ VALIDAÇÃO ATIVA

| Caminho | Tipo de Documentação | Descrição |
|---------|---------------------|-----------|
| `docs/` | User Documentation | Documentação para usuários finais, APIs públicas, guias |
| `.prisma/projeto/` | Technical Documentation | Documentação técnica, arquitetura, padrões (WORKAROUND até arquiteto existir) |
| `docs/decisions/` ou `/decisions/` | ADRs | Architecture Decision Records |

### ❌ SEM VALIDAÇÃO

| Caminho | Motivo |
|---------|--------|
| `.prisma/especificacoes/` | Criados por outros agentes (analista, designer, planejador) |
| `.prisma/relatorios/` | Relatórios temporários de execução |
| `.prisma/comandos/` | Comandos do sistema Prisma |
| `.prisma/agentes/` | Definições de agentes |
| `.claude/` | Configurações do Claude Code |
| Outros arquivos `.md` | Fora do escopo de documentação |

## Validações Realizadas

### Fase 1: Validação Básica de Sintaxe (BLOQUEANTE)

Erros que **impedem** a criação do arquivo:

1. **Code blocks não fechados**
   - Detecta número ímpar de marcadores \`\`\`
   - Exemplo: `Encontrado 3 marcadores ``` (falta fechar 1 code block)`

2. **Links vazios**
   - Link sem texto: `[](https://example.com)`
   - Link sem URL: `[Texto vazio]()`

### Fase 2: Avisos (NÃO BLOQUEANTE)

Avisos que **permitem** a criação mas recomendam correção:

1. **Headers sem espaço**
   - `#Header` deveria ser `# Header`

2. **Múltiplos H1**
   - Recomendado: exatamente 1 header H1 por documento

3. **Nenhum H1**
   - Recomendado: sempre ter 1 header H1 como título principal

4. **YAML frontmatter inválido**
   - Detecta erros de sintaxe YAML (se PyYAML disponível)

## Outputs do Hook

### 1. Decision: BLOCK

Quando erros críticos são detectados:

```json
{
  "decision": "block",
  "reason": "[BLOCKED] 2 erro(s) critico(s) de markdown detectado(s).",
  "errors": [
    "Link sem URL detectado: [Empty Link]()",
    "Link sem texto detectado: [](...)"
  ],
  "warnings": [
    "Header sem espaço após # detectado"
  ],
  "recommendation": "Corrija os erros de sintaxe markdown antes de criar o arquivo.",
  "documentation_rules": {
    "location": "docs/ - Application user documentation",
    "purpose": "Documentar funcionalidades para usuários finais",
    "audience": "End users, API consumers, contributors",
    "standards_ref": ".prisma/agentes/documentador.md (seção: docs/)"
  }
}
```

**Exit Code**: 2 (bloqueia operação)

### 2. Decision: ALLOW

Quando validação básica passa:

```json
{
  "decision": "allow",
  "reason": "[ALLOWED] Arquivo de user-documentation sera criado. Validacao basica passou.",
  "warnings": null,
  "recommendation": "PROXIMO PASSO: Execute o agente documentador para validacao completa...",
  "next_action": {
    "agent": "documentador",
    "when": "after-write",
    "purpose": "Validar estrutura, localizacao, padroes de qualidade e integracao"
  },
  "documentation_rules": {
    "location": "docs/ - Application user documentation",
    "purpose": "Documentar funcionalidades para usuários finais",
    "audience": "End users, API consumers, contributors",
    "standards_ref": ".prisma/agentes/documentador.md (seção: docs/)"
  }
}
```

**Exit Code**: 0 (permite operação)

## Integração com Agente Documentador

### Validação em Duas Etapas

```
┌─────────────────────────────────────────────┐
│ ETAPA 1: Hook PreToolUse                    │
│ (invoke-documentador.py)                    │
│                                             │
│ Validação BÁSICA:                           │
│ • Sintaxe markdown (code blocks, links)     │
│ • Erros bloqueantes críticos                │
│ • Escopo do documentador                    │
│                                             │
│ Resultado: BLOCK ou ALLOW                   │
└─────────────────────────────────────────────┘
                     │
                     ▼ (se ALLOW)
┌─────────────────────────────────────────────┐
│ Arquivo criado no filesystem                │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│ ETAPA 2: Agente Documentador                │
│ (execução manual recomendada)               │
│                                             │
│ Validação COMPLETA:                         │
│ • Estrutura e organização                   │
│ • Padrões de qualidade                      │
│ • Cross-references                          │
│ • Conformidade com standards               │
│ • Integração com docs existentes           │
│ • ADR generation (se aplicável)            │
│                                             │
│ Resultado: Documentação profissional       │
└─────────────────────────────────────────────┘
```

### Por que Duas Etapas?

1. **Hook PreToolUse (Etapa 1)**:
   - **Propósito**: Prevenir erros de sintaxe ANTES de criar arquivo
   - **Escopo**: Validações rápidas e bloqueantes
   - **Timing**: Automático, executa antes de cada Write/Edit
   - **Performance**: < 1 segundo
   - **Limitação**: Não tem contexto completo do projeto

2. **Agente Documentador (Etapa 2)**:
   - **Propósito**: Garantir qualidade profissional APÓS arquivo criado
   - **Escopo**: Validações completas e integração
   - **Timing**: Manual ou após implementação de features
   - **Performance**: Minutos (análise profunda)
   - **Vantagem**: Tem contexto completo, pode reescrever, cross-reference, etc.

## Configuração

### 1. Arquivo de Hook

**Localização**: `.claude/hooks/invoke-documentador.py`

Script Python que implementa a lógica de validação.

### 2. Configuração do Claude Code

**Localização**: `.claude/settings.local.json`

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "python .claude/hooks/invoke-documentador.py",
            "timeout": 30,
            "description": "Aplica regras do agente documentador antes de criar markdown"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"[OK] Arquivo salvo: $CLAUDE_FILE_PATHS\" >&2",
            "description": "Confirma salvamento do arquivo"
          }
        ]
      }
    ]
  }
}
```

## Testando o Hook

### Teste 1: Documento com Erros

```bash
cd "c:\Users\Windows Home\Documents\GitHub\zion-prompt-lab"
python .claude/hooks/invoke-documentador.py < .claude/hooks/test-hook-input.json
```

**Expectativa**: Decision BLOCK com lista de erros

### Teste 2: Documento Válido

```bash
cd "c:\Users\Windows Home\Documents\GitHub\zion-prompt-lab"
python .claude/hooks/invoke-documentador.py < .claude/hooks/test-valid-doc.json
```

**Expectativa**: Decision ALLOW com recomendação para executar documentador

### Teste 3: Arquivo Fora do Escopo

Criar arquivo `.prisma/especificacoes/test/requirements.md`

**Expectativa**: Decision ALLOW sem validação (fora do escopo)

## Workflow Recomendado

### Para Documentação de Usuário (docs/)

```bash
# 1. Criar arquivo (hook valida automaticamente)
# Claude Code executa Write tool → hook intercepta

# 2. Se hook passou, arquivo é criado
# Você verá: "[ALLOWED] Arquivo de user-documentation sera criado..."

# 3. PRÓXIMO PASSO: Execute agente documentador
# Use comando ou invoque manualmente:
# /prisma:documentacao-validar {feature-name}
```

### Para ADRs (docs/decisions/)

```bash
# 1. Criar ADR (hook valida automaticamente)

# 2. Se hook passou, arquivo é criado com aviso:
# "Arquivo de architectural-decision-record sera criado"

# 3. PRÓXIMO PASSO: O documentador verificará:
#    • Template ADR seguido corretamente
#    • Seções obrigatórias presentes
#    • Cross-references com outros ADRs
#    • Evidence links funcionais
```

## Troubleshooting

### Problema: Hook não está executando

**Solução**:
1. Verificar que `.claude/settings.local.json` está correto
2. Reiniciar Claude Code
3. Verificar permissões do arquivo Python

### Problema: Erro "UnicodeEncodeError"

**Solução**: Corrigido na versão atual usando `ensure_ascii=True` e evitando emojis.

### Problema: Hook bloqueia arquivo legítimo

**Solução**:
1. Verificar mensagem de erro do hook
2. Corrigir erros de sintaxe markdown listados
3. Se for falso positivo, reportar para ajustar validação

### Problema: Quero desabilitar temporariamente

**Solução**: Comentar seção de hooks em `.claude/settings.local.json`

```json
{
  "hooks": {
    // "PreToolUse": [ ... ]  // Comentado
  }
}
```

## Referências

- **Agente Documentador**: `.prisma/agentes/documentador.md` (978 linhas, regras completas)
- **Documentação Claude Code Hooks**: https://docs.claude.com/en/docs/claude-code/hooks
- **Templates de Documentação**: `.claude/templates/` (quando disponíveis)
- **Padrões de Qualidade**: Ver seção "Padrões de Qualidade" no documentador.md

## Próximos Passos

### Melhorias Planejadas

1. **Auto-Fix Capability**: Hook pode retornar `decision: "modify"` com conteúdo corrigido
2. **Integração Direta com Documentador**: Hook invoca documentador automaticamente em modo validação
3. **Cache de Validação**: Evitar revalidar arquivos já validados
4. **Validação de Links Externos**: Verificar se URLs externas estão acessíveis
5. **Spell Check**: Integração com corretor ortográfico

### Implementação do Arquiteto

Quando o agente **arquiteto** for implementado:
- `.prisma/projeto/` será de responsabilidade exclusiva do arquiteto
- Hook será atualizado para delegar arquitetura ao arquiteto
- Documentador voltará ao escopo original (apenas `docs/`)

## Conclusão

Este sistema de hooks implementa a primeira linha de defesa para garantir qualidade de documentação, aplicando automaticamente as regras do agente documentador antes mesmo de arquivos serem criados.

**Status**: ✅ Implementado e testado
**Compatibilidade**: Windows (Python 3.x)
**Performance**: < 1 segundo por validação
**Integração**: Claude Code hooks v2.0.10+
