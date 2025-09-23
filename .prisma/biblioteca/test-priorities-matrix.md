<!-- Powered by BMAD™ Core -->

# Matriz de Prioridades de Teste

Guia para priorizar cenários de teste baseado em risco, criticidade e impacto nos negócios.

## Níveis de Prioridade

### P0 - Crítico (Deve Testar)

**Critérios:**

- Funcionalidade que impacta receita
- Caminhos críticos de segurança
- Operações de integridade de dados
- Requisitos de conformidade regulatória
- Funcionalidade anteriormente quebrada (prevenção de regressão)

**Exemplos:**

- Processamento de pagamento
- Autenticação/autorização
- Criação/exclusão de dados do usuário
- Cálculos financeiros
- Conformidade GDPR/privacidade

**Requisitos de Teste:**

- Cobertura abrangente em todos os níveis
- Tanto caminhos felizes quanto infelizes
- Casos extremos e cenários de erro
- Performance sob carga

### P1 - Alto (Deveria Testar)

**Critérios:**

- Jornadas principais do usuário
- Funcionalidades frequentemente usadas
- Funcionalidades com lógica complexa
- Pontos de integração entre sistemas
- Funcionalidades que afetam experiência do usuário

**Exemplos:**

- Fluxo de registro do usuário
- Funcionalidade de busca
- Importação/exportação de dados
- Sistemas de notificação
- Exibições do dashboard

**Requisitos de Teste:**

- Caminhos felizes primários obrigatórios
- Cenários de erro principais
- Casos extremos críticos
- Validação básica de performance

### P2 - Médio (Bom Testar)

**Critérios:**

- Funcionalidades secundárias
- Funcionalidade de administração
- Funcionalidades de relatório
- Opções de configuração
- Polimento de UI e estética

**Exemplos:**

- Painéis de configurações do admin
- Geração de relatórios
- Customização de temas
- Documentação de ajuda
- Rastreamento de analytics

**Requisitos de Teste:**

- Cobertura do caminho feliz
- Tratamento básico de erros
- Pode adiar casos extremos

### P3 - Baixo (Testar se o Tempo Permitir)

**Critérios:**

- Funcionalidades raramente usadas
- Funcionalidade desejável mas não essencial
- Questões cosméticas
- Otimizações não críticas

**Exemplos:**

- Preferências avançadas
- Suporte a funcionalidades legadas
- Funcionalidades experimentais
- Utilitários de debug

**Requisitos de Teste:**

- Apenas testes de fumaça
- Pode depender de testes manuais
- Documentar limitações conhecidas

## Ajustes de Prioridade Baseados em Risco

### Aumentar Prioridade Quando:

- Alto impacto no usuário (afeta >50% dos usuários)
- Alto impacto financeiro (>$10K de perda potencial)
- Potencial de vulnerabilidade de segurança
- Requisitos de conformidade/legais
- Problemas relatados por clientes
- Implementação complexa (>500 LOC)
- Múltiplas dependências de sistema

### Diminuir Prioridade Quando:

- Protegido por feature flag
- Lançamento gradual planejado
- Monitoramento forte em vigor
- Capacidade de rollback fácil
- Métricas de uso baixas
- Implementação simples
- Componente bem isolado

## Cobertura de Teste por Prioridade

| Prioridade | Cobertura Unitária | Cobertura de Integração | Cobertura E2E            |
| ---------- | ------------------ | ----------------------- | ------------------------ |
| P0         | >90%               | >80%                    | Todos os caminhos críticos |
| P1         | >80%               | >60%                    | Principais caminhos felizes |
| P2         | >60%               | >40%                    | Testes de fumaça         |
| P3         | Melhor esforço     | Melhor esforço          | Apenas manual            |

## Regras de Atribuição de Prioridade

1. **Comece com impacto nos negócios** - O que acontece se isso falhar?
2. **Considere probabilidade** - Quão provável é a falha?
3. **Considere detectabilidade** - Saberíamos se falhasse?
4. **Considere recuperabilidade** - Podemos corrigir rapidamente?

## Árvore de Decisão de Prioridade

```
É crítico para receita?
├─ SIM → P0
└─ NÃO → Afeta jornada principal do usuário?
    ├─ SIM → É de alto risco?
    │   ├─ SIM → P0
    │   └─ NÃO → P1
    └─ NÃO → É frequentemente usado?
        ├─ SIM → P1
        └─ NÃO → É voltado para o cliente?
            ├─ SIM → P2
            └─ NÃO → P3
```

## Ordem de Execução de Testes

1. Execute testes P0 primeiro (falhe rápido em problemas críticos)
2. Execute testes P1 em segundo (funcionalidade principal)
3. Execute testes P2 se o tempo permitir
4. Testes P3 apenas em ciclos completos de regressão

## Ajuste Contínuo

Revisar e ajustar prioridades baseado em:

- Padrões de incidentes de produção
- Feedback e reclamações de usuários
- Analytics de uso
- Histórico de falhas de teste
- Mudanças de prioridade do negócio