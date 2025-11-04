# Decisions - VSCode Notification Factory

Este diretório armazena Architecture Decision Records (ADRs) para a feature `vscode-notification-factory`.

## Estrutura

```
decisions/
├── README.md (este arquivo)
├── 001-factory-pattern.md
├── 002-singleton-vs-instance.md
├── 003-builder-api-design.md
└── 004-backward-compatibility-strategy.md
```

## Formato ADR

Cada decisão segue o formato ADR (Architecture Decision Record):

```markdown
# ADR-XXX: [Título da Decisão]

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
[Contexto que levou à necessidade de decisão]

## Decision
[Decisão tomada]

## Consequences
[Consequências (positivas e negativas) da decisão]

## Alternatives Considered
[Alternativas consideradas e por que foram rejeitadas]

## Related Requirements
- REQ-XXX
- REQ-YYY

## Date
YYYY-MM-DD

## Stakeholders
- [Nome] - [Papel] (Approved/Rejected/Abstained)
```

## Decisões Registradas

### ADR-001: Factory Pattern
- **Status**: Accepted
- **Contexto**: Necessidade de criar múltiplos tipos de notificações com API consistente
- **Decisão**: Usar Factory Pattern com Singleton para NotificationManager
- **Consequências**: Separação de concerns, extensibilidade, mas adiciona camada de abstração

### ADR-002: Singleton vs Instance
- **Status**: Accepted
- **Contexto**: Gerenciamento de estado global de notificações
- **Decisão**: Implementar getInstance() seguindo padrão de ConfigManager
- **Consequências**: Estado consistente, mas testes requerem reset entre casos

### ADR-003: Builder API Design
- **Status**: Accepted
- **Contexto**: API fluida vs options object para configuração de notificações
- **Decisão**: Usar Builder Pattern com métodos chainable
- **Consequências**: API intuitiva, mas mais classes (um builder por tipo)

### ADR-004: Backward Compatibility Strategy
- **Status**: Accepted
- **Contexto**: 13 ocorrências de NotificationUtils no código atual
- **Decisão**: Manter NotificationUtils como thin wrapper sobre factory
- **Consequências**: Zero breaking changes, mas duplicação de API (temporária)

## Convenções

- Cada ADR tem número sequencial (001, 002, 003...)
- ADRs nunca são deletadas, apenas marcadas como Deprecated/Superseded
- Decisões arquiteturais significativas devem ter ADR (não micro-decisions)
- Stakeholders devem ser registrados com nome e voto

## Referências

- [requirements.md](../requirements.md) - Requisitos relacionados a decisões
- [design.md](../design.md) - Design implementando decisões
- [alignment-analysis.md](../alignment-analysis.md) - Análise arquitetural inicial
