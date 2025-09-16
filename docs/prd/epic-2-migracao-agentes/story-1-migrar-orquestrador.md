# Story: Migrar Agente Orquestrador

## 📋 Informações da Story
**Epic**: Migração de Agentes
**Prioridade**: P0 - Crítica
**Estimativa**: 5 pontos
**Sprint**: 2
**Dependências**: epic-1-mapeamento completo

---

## História de Usuário

**Como** desenvolvedor PRISMA
**Quero** o agente orquestrador funcionando em português
**Para** coordenar todos os outros agentes no novo sistema

## Contexto Completo

### Situação Atual
- bmad-orchestrator existe em `.bmad-core/agents/bmad-orchestrator.md`
- Agente central que coordena todos os outros
- Comandos em inglês: `*help`, `*agent`, `*task`, etc.
- Adaptador já criado e testado (Epic 1)

### Objetivo
Migrar completamente bmad-orchestrator para `agentes/orquestrador/index.md` em português, mantendo todas funcionalidades e adicionando retrocompatibilidade.

## Critérios de Aceitação

- [ ] Estrutura de diretório criada: `agentes/orquestrador/`
- [ ] Arquivo principal `index.md` em português
- [ ] Todos comandos traduzidos e funcionando
- [ ] Componentes modularizados em `componentes/`
- [ ] Herança de `_compartilhado/` implementada
- [ ] Funciona via comando BMAD: `*agent bmad-orchestrator`
- [ ] Funciona via comando PRISMA: `/prisma agente orquestrador`
- [ ] Documentação atualizada

## Especificação Técnica

### Estrutura do Agente
```
agentes/
├── orquestrador/
│   ├── index.md              # Ponto de entrada principal
│   ├── config.yaml           # Configuração específica
│   └── componentes/
│       ├── ativacao.md       # Lógica de ativação
│       ├── roteamento.md     # Roteamento de comandos
│       ├── descoberta.md     # Descoberta de agentes
│       └── ajuda.md          # Sistema de ajuda
```

### Tradução de Comandos

| BMAD | PRISMA |
|------|--------|
| *help | ajuda |
| *agent [name] | agente [nome] |
| *task [name] | tarefa [nome] |
| *workflow [name] | fluxo [nome] |
| *status | estado |
| *exit | sair |
| *chat-mode | modo-chat |
| *kb-mode | modo-kb |
| *party-mode | modo-festa |

### Arquivo index.md
```markdown
# Orquestrador PRISMA

## Identificação
- **Nome**: Orquestrador PRISMA
- **ID**: orquestrador
- **Versão**: 1.0.0
- **Compatível com**: bmad-orchestrator

## Ativação

### Comando PRISMA (Nativo)
```
/prisma agente orquestrador
```

### Comando BMAD (Retrocompatível)
```
*agent bmad-orchestrator
```

## Comandos Disponíveis

### Comandos Principais
- `ajuda` - Mostra este guia de comandos
- `agente [nome]` - Transforma em agente especializado
- `tarefa [nome]` - Executa tarefa específica
- `fluxo [nome]` - Inicia workflow
- `estado` - Mostra contexto atual
- `sair` - Retorna ao modo anterior

## Persona
- **Papel**: Coordenador mestre do sistema PRISMA
- **Estilo**: Eficiente, claro, orientador
- **Foco**: Direcionar para o agente/recurso correto
```

## Tarefas de Implementação

1. **Criar estrutura de diretórios**
   ```bash
   mkdir -p agentes/orquestrador/componentes
   mkdir -p agentes/_compartilhado
   ```

2. **Traduzir arquivo principal**
   - Converter bmad-orchestrator.md
   - Adaptar para estrutura PRISMA
   - Manter lógica core

3. **Modularizar componentes**
   - Separar lógicas em arquivos específicos
   - Implementar herança de _compartilhado
   - Criar config.yaml

4. **Implementar retrocompatibilidade**
   - Registrar no adaptador
   - Mapear comandos antigos
   - Testar ambos modos

5. **Criar testes específicos**
   - Teste de ativação
   - Teste de cada comando
   - Teste de transformação

6. **Documentar migração**
   - Guia de uso
   - Tabela de equivalências
   - Exemplos práticos

## Casos de Teste

```bash
# Teste 1: Ativação BMAD
*agent bmad-orchestrator
# Esperado: Orquestrador ativado em português

# Teste 2: Ativação PRISMA
/prisma agente orquestrador
# Esperado: Mesmo resultado

# Teste 3: Comando ajuda
ajuda
# Esperado: Lista comandos em português

# Teste 4: Transformação
agente desenvolvedor
# Esperado: Transforma em desenvolvedor

# Teste 5: Retrocompatibilidade comando
*help
# Esperado: Mostra ajuda em português
```

## Definição de Pronto

- [x] Agente migrado e funcionando
- [x] Todos comandos traduzidos
- [x] Testes passando 100%
- [x] Documentação completa
- [x] Code review aprovado
- [x] Integrado ao sistema

## Notas Adicionais

- Agente mais importante - fazer com cuidado
- Base para todos os outros agentes
- Manter log detalhado de mudanças
- Validar com usuários BMAD atuais
- Considerar beta test antes de release

## Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Quebrar coordenação | Testes extensivos |
| Comandos não reconhecidos | Fallback inteligente |
| Performance degradada | Otimização e cache |
| Confusão na transição | Documentação clara |

---
*Story fragmentada do PRD principal*
*Última atualização: 2025-09-16*