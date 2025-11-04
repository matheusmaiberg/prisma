# Artifacts - VSCode Notification Factory

Este diretório armazena artefatos gerados durante o desenvolvimento da feature `vscode-notification-factory`.

## Estrutura

```
artifacts/
├── README.md (este arquivo)
├── qa-checklist.md (criado durante fase de testes)
├── migration-guide.md (criado durante implementação)
├── performance-benchmarks/ (resultados de testes de performance)
└── diagrams/ (diagramas complementares não incluídos em design.md)
```

## Tipos de Artefatos

### QA Checklist
- Checklist manual de QA para validação de 28 notification sites
- Criado durante fase de testes
- Localização: `qa-checklist.md`

### Migration Guide
- Guia de migração de NotificationUtils para NotificationFactory
- Exemplos de before/after
- Criado durante implementação
- Localização: `migration-guide.md`

### Performance Benchmarks
- Resultados de testes de performance
- JSON outputs de CI runs
- Trending charts
- Localização: `performance-benchmarks/`

### Diagrams
- Diagramas complementares (sequence, activity, etc.)
- Não incluídos em design.md por serem opcionais
- Formato: Mermaid ou PlantUML
- Localização: `diagrams/`

## Convenções

- Todos os arquivos devem ter timestamp de criação nos metadados
- Benchmarks devem seguir formato JSON para parsing automático
- Diagramas devem incluir fonte (Mermaid/PlantUML) além de PNG export

## Referências

- [requirements.md](../requirements.md) - Requisitos que geraram artefatos
- [design.md](../design.md) - Design técnico
- [tasks.md](../tasks.md) - Tarefas de implementação
