#!/bin/bash
# PRISMA Command Snippets
# Copie e cole os comandos abaixo para usar o sistema PRISMA

# ============================================================================
# 1. COMANDOS DE BOOTSTRAP
# ============================================================================

# Inicializar sistema PRISMA
claude --agent prisma-prime --prompt "bootstrap PRISMA system"

# Verificar status após bootstrap
claude --agent prisma-prime --prompt "status show system health"

# ============================================================================
# 2. COMANDOS DE ANÁLISE
# ============================================================================

# Análise completa do codebase
claude --agent prisma-prime --prompt "run full analysis on current codebase structure"

# Análise rápida
claude --agent prisma-prime --prompt "analyze system quick check"

# Análise de contexto específico
claude --agent context-analyzer --prompt "analyze context for workflow optimization"

# ============================================================================
# 3. COMANDOS DE MONITORAMENTO
# ============================================================================

# Mostrar dashboard de progresso
claude --agent progress-tracker --prompt "show dashboard with current workflow status"

# Verificar logs recentes
claude --agent event-logger --prompt "show last 10 events with severity info or higher"

# Status de cache
claude --agent context-analyzer --prompt "show cache status and optimization suggestions"

# ============================================================================
# 4. COMANDOS DE DEBUG
# ============================================================================

# Debug de agente específico
claude --agent prisma-prime --prompt "debug state-manager show configuration and last operations"

# Debug de workflow
claude --agent prisma-prime --prompt "debug workflow show detailed execution trace"

# Verificar integridade do sistema
claude --agent state-manager --prompt "validate system integrity and report issues"

# ============================================================================
# 5. COMANDOS DE MANUTENÇÃO
# ============================================================================

# Cleanup de cache expirado
claude --agent state-manager --prompt "cleanup expired cache and optimize storage"

# Rotação de logs
claude --agent event-logger --prompt "rotate logs and archive old events"

# Backup de estado crítico
claude --agent state-manager --prompt "backup critical state data"

# ============================================================================
# 6. COMANDOS DE CRIAÇÃO DE AGENTES
# ============================================================================

# Criar novo agente com meta-agente
claude --agent meta-agente --prompt "Build a new sub-agent for [DESCRIPTION]. The agent should [CAPABILITIES] and integrate with PRISMA system."

# Exemplo específico:
claude --agent meta-agente --prompt "Build a new sub-agent for automated testing. The agent should run tests, collect results, and generate reports with integration to progress-tracker."

# ============================================================================
# 7. WORKFLOWS CUSTOMIZADOS
# ============================================================================

# Workflow de desenvolvimento
claude --agent prisma-prime --prompt "execute development workflow: analyze codebase, run tests, generate documentation"

# Workflow de deploy
claude --agent prisma-prime --prompt "execute deployment workflow: validate code, run tests, prepare release"

# Workflow de debugging
claude --agent prisma-prime --prompt "execute debugging workflow: collect logs, analyze errors, suggest fixes"

# ============================================================================
# 8. COMANDOS DE INTEGRAÇÃO
# ============================================================================

# Integração com external tools
claude --agent prisma-prime --prompt "integrate with git status and provide analysis"

# Integração com CI/CD
claude --agent event-logger --prompt "log CI/CD events and track deployment status"

# ============================================================================
# 9. COMANDOS DE PERFORMANCE
# ============================================================================

# Análise de performance
claude --agent context-analyzer --prompt "analyze performance patterns and suggest optimizations"

# Métricas de sistema
claude --agent progress-tracker --prompt "show system metrics and performance dashboard"

# ============================================================================
# 10. COMANDOS DE BACKUP E RESTORE
# ============================================================================

# Backup completo
claude --agent state-manager --prompt "create full system backup including state, logs, and configuration"

# Restore de backup
claude --agent state-manager --prompt "restore system from backup with validation"

# ============================================================================
# ALIASES ÚTEIS (adicione ao seu .bashrc/.zshrc)
# ============================================================================

alias prisma-boot='claude --agent prisma-prime --prompt "bootstrap PRISMA system"'
alias prisma-status='claude --agent prisma-prime --prompt "status show detailed system information"'
alias prisma-analyze='claude --agent prisma-prime --prompt "run full analysis"'
alias prisma-debug='claude --agent prisma-prime --prompt "debug system show all issues"'
alias prisma-clean='claude --agent state-manager --prompt "cleanup expired cache and optimize"'

# ============================================================================
# COMANDOS DE TESTING
# ============================================================================

# Teste individual de agente
test_agent() {
    local agent_name=$1
    local test_prompt=$2
    echo "🧪 Testing $agent_name with: $test_prompt"
    claude --agent $agent_name --prompt "$test_prompt"
}

# Exemplo de uso:
# test_agent state-manager "save test state data"
# test_agent event-logger "log test event"

# Teste de workflow completo
test_workflow() {
    local workflow_name=$1
    echo "🔄 Testing workflow: $workflow_name"
    claude --agent prisma-prime --prompt "test workflow $workflow_name with validation"
}

# ============================================================================
# MONITORING CONTÍNUO
# ============================================================================

# Monitor de saúde do sistema (executar periodicamente)
prisma_health_check() {
    echo "🏥 PRISMA Health Check - $(date)"
    claude --agent prisma-prime --prompt "health check report system status"
}

# Monitor de performance
prisma_performance_check() {
    echo "⚡ PRISMA Performance Check - $(date)"
    claude --agent context-analyzer --prompt "performance analysis with recommendations"
}

# ============================================================================
# EXEMPLO DE USO COMPLETO
# ============================================================================

# Fluxo completo de análise
full_analysis_workflow() {
    echo "🚀 Iniciando análise completa PRISMA..."

    # 1. Bootstrap
    claude --agent prisma-prime --prompt "bootstrap PRISMA system"

    # 2. Análise
    claude --agent prisma-prime --prompt "run full analysis on current project"

    # 3. Status
    claude --agent progress-tracker --prompt "show final dashboard with results"

    echo "✅ Análise completa finalizada!"
}

# Para usar: full_analysis_workflow