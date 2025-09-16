# Story: Migrar Agente Desenvolvedor

## 📋 Informações da Story
**Epic**: Migração de Agentes
**Prioridade**: P0 - Crítica
**Estimativa**: 5 pontos
**Sprint**: 2
**Dependências**: story-1-migrar-orquestrador

---

## História de Usuário

**Como** desenvolvedor usando PRISMA
**Quero** o agente dev funcionando em português
**Para** ter assistência de desenvolvimento no novo sistema

## Contexto Completo

### Situação Atual
- dev.md existe em `.bmad-core/agents/dev.md`
- Agente mais utilizado depois do orquestrador
- Gera código, implementa stories, corrige bugs
- Orquestrador já migrado (story anterior)

### Objetivo
Migrar dev.md para `agentes/desenvolvedor/index.md`, traduzindo comandos e mantendo todas capacidades de geração de código.

## Critérios de Aceitação

- [ ] Estrutura criada: `agentes/desenvolvedor/`
- [ ] Comandos de desenvolvimento traduzidos
- [ ] Capacidades de geração preservadas
- [ ] Templates de código migrados
- [ ] Funciona com `*agent dev` e `/prisma agente desenvolvedor`
- [ ] Integração com orquestrador validada
- [ ] Documentação técnica atualizada

## Especificação Técnica

### Estrutura do Agente
```
agentes/
├── desenvolvedor/
│   ├── index.md                 # Principal
│   ├── config.yaml              # Config
│   └── componentes/
│       ├── geracao-codigo.md    # Code generation
│       ├── analise-codigo.md    # Code analysis
│       ├── implementacao.md     # Story implementation
│       ├── debugging.md         # Debug tools
│       └── refatoracao.md       # Refactoring
```

### Comandos Traduzidos

| BMAD | PRISMA | Descrição |
|------|--------|-----------|
| *implement | implementar | Implementa story/feature |
| *generate | gerar | Gera código/componente |
| *fix | corrigir | Corrige bugs |
| *refactor | refatorar | Refatora código |
| *test | testar | Cria/executa testes |
| *analyze | analisar | Analisa código |
| *optimize | otimizar | Otimiza performance |

### Capacidades Principais

```yaml
desenvolvedor:
  capacidades:
    geracao_codigo:
      - componentes_react
      - apis_rest
      - models_database
      - testes_unitarios
      - documentacao

    linguagens:
      - javascript/typescript
      - python
      - java
      - go
      - rust

    frameworks:
      - react/next
      - express/fastify
      - django/flask
      - spring

    ferramentas:
      - git
      - docker
      - ci_cd
      - testing
```

## Tarefas de Implementação

1. **Criar estrutura**
   ```bash
   mkdir -p agentes/desenvolvedor/componentes
   ```

2. **Traduzir core**
   - Converter dev.md base
   - Adaptar persona para PT-BR
   - Manter lógicas de geração

3. **Migrar componentes**
   - Separar por responsabilidade
   - Criar módulos reusáveis
   - Implementar herança

4. **Traduzir templates**
   - Templates de código
   - Mensagens de erro
   - Documentação inline

5. **Integrar com sistema**
   - Registrar no orquestrador
   - Atualizar adaptador
   - Validar fluxos

6. **Criar suite de testes**
   - Geração de código
   - Implementação de stories
   - Debugging
   - Refatoração

## Exemplos de Uso

### Comando Antigo (BMAD)
```bash
*agent dev
*implement story-123
```

### Comando Novo (PRISMA)
```bash
/prisma agente desenvolvedor
implementar story-123
```

### Resultado Esperado
```
🔧 Desenvolvedor PRISMA Ativado
📋 Implementando story-123...

✅ Arquivos criados:
- src/components/NovoComponente.tsx
- src/hooks/useNovoHook.ts
- tests/NovoComponente.test.tsx

📝 Próximos passos:
1. Revisar código gerado
2. Executar testes
3. Fazer commit
```

## Validações Necessárias

1. **Funcionalidade Core**
   - [ ] Gera código corretamente
   - [ ] Implementa stories completas
   - [ ] Corrige bugs identificados
   - [ ] Refatora mantendo funcionalidade

2. **Compatibilidade**
   - [ ] Comandos BMAD funcionam
   - [ ] Comandos PRISMA funcionam
   - [ ] Output em português correto
   - [ ] Sem quebra de workflows

3. **Performance**
   - [ ] Geração rápida (<2s)
   - [ ] Sem memory leaks
   - [ ] Cache eficiente

## Definição de Pronto

- [x] Agente completamente migrado
- [x] Todos comandos funcionando
- [x] Testes com cobertura >90%
- [x] Documentação atualizada
- [x] Review aprovado
- [x] Deploy em produção

## Notas Adicionais

- Segundo agente mais crítico
- Muitos usuários dependem dele
- Testar com projetos reais
- Coletar feedback early adopters
- Preparar guia de migração

## Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Geração incorreta | Validação extensiva templates |
| Perda de features | Checklist completo capacidades |
| Incompatibilidade | Testes em projetos diversos |
| Resistência usuários | Documentação e tutoriais |

---
*Story fragmentada do PRD principal*
*Última atualização: 2025-09-16*