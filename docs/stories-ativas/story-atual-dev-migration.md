# Story Ativa: Migrar Agente Desenvolvedor

## 📋 Status da Story
**Sprint**: 2
**Status**: READY FOR DEV
**Prioridade**: P0 - Crítica
**Pontos**: 5
**Assignee**: Dev Agent

---

## Contexto Completo para Execução

### Situação Atual
- ✅ Orquestrador já migrado e funcionando
- ✅ Adaptador implementado e testado
- ✅ Estrutura base criada em `agentes/_compartilhado/`
- 📍 Agente dev em `.bmad-core/agents/dev.md` aguardando migração

### Objetivo
Migrar completamente o agente desenvolvedor para `agentes/desenvolvedor/` seguindo o padrão estabelecido com o orquestrador.

---

## Tasks Detalhadas para DEV

### Task 1: Criar Estrutura
```bash
mkdir -p agentes/desenvolvedor/componentes
```

### Task 2: Migrar e Traduzir
Converter `.bmad-core/agents/dev.md` para `agentes/desenvolvedor/index.md`:

**Traduções Obrigatórias:**
- implement → implementar
- generate → gerar
- fix → corrigir
- refactor → refatorar
- test → testar
- analyze → analisar
- optimize → otimizar
- build → construir
- debug → depurar

### Task 3: Criar Componentes
Criar em `agentes/desenvolvedor/componentes/`:
- `geracao-codigo.md` - Lógica de geração
- `analise-codigo.md` - Análise estática
- `debugging.md` - Ferramentas debug
- `refatoracao.md` - Refactoring tools

### Task 4: Configuração
Criar `agentes/desenvolvedor/config.yaml`:
```yaml
versao: 1.0.0
id: desenvolvedor
compativel_com: dev

heranca:
  - _compartilhado/base-agente
  - _compartilhado/comandos-comuns

comandos:
  implementar:
    aliases: [implement, impl]
    descricao: Implementa story ou feature

  gerar:
    aliases: [generate, gen]
    parametros: [tipo, nome]
    descricao: Gera código/componente

  corrigir:
    aliases: [fix]
    parametros: [bug_id]
    descricao: Corrige bug específico

  refatorar:
    aliases: [refactor]
    parametros: [arquivo]
    descricao: Refatora código

  testar:
    aliases: [test]
    parametros: [arquivo?]
    descricao: Executa/cria testes
```

### Task 5: Integração
1. Adicionar ao orquestrador em `agentes/orquestrador/config.yaml`
2. Verificar mapeamento em `config/mapeamento.yaml`
3. Testar ativação via adaptador

---

## Critérios de Aceitação para DEV

- [ ] Estrutura completa criada
- [ ] Todos comandos traduzidos
- [ ] Componentes modularizados
- [ ] Config.yaml funcional
- [ ] Herança de _compartilhado implementada
- [ ] Teste: `*agent dev` funciona
- [ ] Teste: `/prisma agente desenvolvedor` funciona
- [ ] Teste: Comando `implementar` executa
- [ ] Documentação inline em português

---

## Definition of Done

1. ✅ Código implementado
2. ✅ Testes passando
3. ✅ Integrado com orquestrador
4. ✅ Documentado
5. ✅ Pronto para QA

---

## Notas para DEV

- Use o orquestrador como referência
- Mantenha consistência de tradução
- Preserve TODAS funcionalidades do dev.md original
- Adicione logs para debugging
- Comente código complexo em português

---

**STORY PRONTA PARA IMPLEMENTAÇÃO**
*Próximo: Dev Agent implementa esta story*