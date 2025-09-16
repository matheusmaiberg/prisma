# Story: Migração em Lote dos Agentes Restantes

## 📋 Status da Story
**Sprint**: 3
**Status**: IN PROGRESS
**Prioridade**: P0 - Crítica
**Pontos**: 13
**Tipo**: Batch Migration

---

## Agentes para Migrar

| Ordem | Agente BMAD | Agente PRISMA | Pontos | Status |
|-------|------------|---------------|---------|--------|
| 1 | analyst | analista | 3 | ⏳ |
| 2 | architect | arquiteto | 2 | ⏳ |
| 3 | pm | gerente-projeto | 2 | ⏳ |
| 4 | po | product-owner | 2 | ⏳ |
| 5 | qa | qualidade | 2 | ⏳ |
| 6 | sm | scrum-master | 1 | ⏳ |
| 7 | ux-expert | especialista-ux | 1 | ⏳ |

---

## Contexto para Execução

### Padrão Estabelecido
Use os agentes já migrados como referência:
- `agentes/orquestrador/` - Estrutura base
- `agentes/desenvolvedor/` - Exemplo completo
- `agentes/_compartilhado/` - Componentes herdados

### Estrutura Padrão por Agente
```
agentes/
└── [nome-agente]/
    ├── index.md         # Arquivo principal
    ├── config.yaml      # Configuração
    └── componentes/     # Componentes específicos (opcional)
```

---

## Tasks de Implementação

### Para CADA agente:

1. **Criar estrutura de diretórios**
2. **Ler arquivo BMAD original** em `.bmad-core/agents/[agente].md`
3. **Criar index.md traduzido** com:
   - Identificação completa
   - Comandos em português
   - Persona adaptada
   - Exemplos de uso
4. **Criar config.yaml** com:
   - Herança de _compartilhado
   - Mapeamento de comandos
   - Aliases apropriados
5. **Testar ativação** via BMAD e PRISMA
6. **Atualizar esta story** com status

---

## Critérios de Aceitação

- [ ] Todos 7 agentes com estrutura criada
- [ ] 100% comandos traduzidos por agente
- [ ] Retrocompatibilidade testada
- [ ] Integração com orquestrador
- [ ] Documentação em português
- [ ] Config files válidos

---

## Dev Agent Record

### File List
```
CREATED:
- agentes/analista/index.md
- agentes/analista/config.yaml
- agentes/arquiteto/index.md
- agentes/arquiteto/config.yaml
- agentes/gerente-projeto/index.md
- agentes/gerente-projeto/config.yaml
- agentes/product-owner/index.md
- agentes/product-owner/config.yaml
- agentes/qualidade/index.md
- agentes/qualidade/config.yaml
- agentes/scrum-master/index.md
- agentes/scrum-master/config.yaml
- agentes/especialista-ux/index.md
- agentes/especialista-ux/config.yaml
```

### Change Log
- [2025-09-16 10:00] Story criada
- [2025-09-16 10:15] Iniciando migração em lote

---

**EXECUTAR MIGRAÇÃO SEGUINDO ORDEM DA TABELA**