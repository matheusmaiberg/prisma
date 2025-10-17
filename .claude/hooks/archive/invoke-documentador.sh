#!/bin/bash
# Hook para invocar agente documentador antes de criar arquivos markdown
# Este hook é executado ANTES de operações Write/Edit em arquivos .md

# Ler input JSON do Claude Code
input=$(cat)

# Extrair informações do JSON
tool_name=$(echo "$input" | jq -r '.tool_name')
file_path=$(echo "$input" | jq -r '.tool_input.file_path')
content=$(echo "$input" | jq -r '.tool_input.content')

# Verificar se é arquivo markdown
if [[ ! "$file_path" =~ \.md$ ]]; then
    # Não é markdown, permitir sem validação
    echo '{"decision":"allow","reason":"Não é arquivo markdown"}' | jq
    exit 0
fi

# Determinar se precisa validação do documentador
# Regras:
# 1. Arquivos em docs/ -> SIM (documentação de usuário)
# 2. Arquivos em .prisma/projeto/ -> SIM (documentação técnica, até arquiteto existir)
# 3. Arquivos em .prisma/especificacoes/ -> NÃO (criados por outros agentes)
# 4. Arquivos em .prisma/relatorios/ -> NÃO (relatórios temporários)
# 5. Arquivos em .prisma/comandos/ -> NÃO (comandos do sistema)
# 6. Arquivos em .prisma/agentes/ -> NÃO (definições de agentes)

needs_validation=false

if [[ "$file_path" =~ ^docs/ ]]; then
    needs_validation=true
    doc_type="user-documentation"
elif [[ "$file_path" =~ ^\.prisma/projeto/ ]]; then
    needs_validation=true
    doc_type="technical-documentation"
fi

if [ "$needs_validation" = false ]; then
    # Arquivo não precisa validação do documentador
    echo '{"decision":"allow","reason":"Arquivo fora do escopo de documentação"}' | jq
    exit 0
fi

# FASE 1: Validação Básica de Markdown
# Verificar problemas críticos que o documentador não conseguiria auto-corrigir

errors=()
warnings=()

# 1. Headers sem espaço
if echo "$content" | grep -qE '^#{1,6}[^#\s]'; then
    warnings+=("Header sem espaço após # detectado")
fi

# 2. Code blocks não fechados
code_block_count=$(echo "$content" | grep -c '```' || true)
if [ $((code_block_count % 2)) -ne 0 ]; then
    errors+=("Code block não fechado detectado")
fi

# 3. Links vazios
if echo "$content" | grep -qE '\[([^\]]*)\]\(([^)]*)\)' && echo "$content" | grep -qE '\[\s*\]\([^)]+\)|\[[^\]]+\]\(\s*\)'; then
    errors+=("Link com texto ou URL vazio detectado")
fi

# Se há erros críticos, bloquear
if [ ${#errors[@]} -gt 0 ]; then
    error_json=$(printf '%s\n' "${errors[@]}" | jq -R . | jq -s .)
    warning_json=$(printf '%s\n' "${warnings[@]}" | jq -R . | jq -s .)

    cat <<EOF | jq
{
    "decision": "block",
    "reason": "Erros críticos de markdown detectados. Corrija antes de prosseguir.",
    "errors": $error_json,
    "warnings": $warning_json,
    "recommendation": "Corrija os erros de sintaxe markdown básica antes de criar o arquivo. O documentador validará estrutura e padrões após."
}
EOF
    exit 2
fi

# FASE 2: Notificação para Validação pelo Documentador
# Arquivo será criado, mas avisar que documentador deve revisar

cat <<EOF | jq
{
    "decision": "allow",
    "reason": "Arquivo de $doc_type será criado. RECOMENDAÇÃO: Execute validação com documentador após conclusão.",
    "warnings": $(printf '%s\n' "${warnings[@]}" | jq -R . | jq -s .),
    "next_action": {
        "agent": "documentador",
        "when": "after-write",
        "purpose": "Validar estrutura, localização, padrões de qualidade e integração com documentação existente"
    },
    "documentation_rules": {
        "location": "$(echo $file_path | grep -q '^docs/' && echo 'docs/ - Application user documentation' || echo '.prisma/projeto/ - Technical/project documentation')",
        "standards": "Ver .prisma/agentes/documentador.md para regras completas",
        "quality_gates": [
            "Estrutura consistente (headers, seções)",
            "Links funcionais",
            "Code snippets com syntax highlighting",
            "Cross-references atualizados"
        ]
    }
}
EOF

exit 0
