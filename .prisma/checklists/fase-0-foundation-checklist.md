# ✅ CHECKLIST FASE 0: FOUNDATION PLUS
## Transformação BMad → PRISMA com Manual Mode

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- **MODO**: MANUAL CONTROL
- **VALIDAÇÃO**: Checkpoint após cada milestone
- **ROLLBACK**: Disponível a qualquer momento

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📋 PRÉ-REQUISITOS
- [ ] BMad funcionando corretamente
- [ ] Backup completo do projeto
- [ ] Claude Code CLI atualizado
- [ ] Git branch `prisma-migration` criado

---

## 🎯 SEMANA 1: COMMAND BRIDGE & ESTRUTURA

### CHECKPOINT 1.1: Setup Inicial
**Objetivo**: Criar estrutura PRISMA sem quebrar BMad

#### Tasks:
- [ ] Criar estrutura de diretórios `.prisma/`
  ```
  .prisma/
  ├── bridge/           # Compatibilidade BMad
  ├── core/            # Engine PRISMA
  ├── state/           # Persistência
  ├── events/          # Event sourcing
  └── checklists/      # Validações
  ```

- [ ] Criar arquivo `.prisma-bridge.yaml`
  ```yaml
  mode: "hybrid"
  preserve_bmad_commands: true
  enable_prisma_features: selective
  compatibility_warnings: true
  ```

- [ ] Implementar command mapper básico
  - [ ] `/prisma help` mapeando para `*help`
  - [ ] `/prisma agente` mapeando para agentes BMad
  - [ ] Aliases funcionando bidirecionalmente

- [ ] Validar que comandos BMad continuam funcionando
  - [ ] `*help` funciona
  - [ ] `*create-doc` funciona
  - [ ] `*agent dev` funciona
  - [ ] `*ultrathink` funciona

#### Validation Gate:
```
✓ BMad 100% funcional
✓ Comandos PRISMA respondem
✓ Sem breaking changes
✓ Git diff mostra apenas adições
```

**[MANUAL CHECKPOINT]**
- [ ] Aprovar para continuar
- [ ] Rollback necessário
- [ ] Ajustes antes de prosseguir

---

### CHECKPOINT 1.2: Estado Persistente MVP
**Objetivo**: Implementar memória entre sessões

#### Tasks:
- [ ] Criar sistema de estado básico
  ```yaml
  .prisma/state/session-state.yaml
  .prisma/state/context-cache.yaml
  .prisma/state/project-memory.yaml
  ```

- [ ] Implementar auto-save
  - [ ] Save a cada comando completado
  - [ ] Save antes de trocar agente
  - [ ] Save em checkpoints críticos

- [ ] Implementar auto-load
  - [ ] Detectar estado existente ao iniciar
  - [ ] Carregar contexto relevante
  - [ ] Mostrar resumo do estado carregado

- [ ] Testar persistência
  - [ ] Executar comando `/prisma analisar`
  - [ ] Fechar sessão
  - [ ] Reabrir e verificar memória
  - [ ] Contexto preservado corretamente

#### Validation Gate:
```
✓ Estado salvo automaticamente
✓ Estado carregado na nova sessão
✓ Contexto preservado entre sessões
✓ Performance não impactada
```

**[MANUAL CHECKPOINT]**
- [ ] Aprovar estado persistente
- [ ] Precisa de ajustes
- [ ] Rollback e repensar

---

### CHECKPOINT 1.3: Event Sourcing Básico
**Objetivo**: Registrar todas as decisões

#### Tasks:
- [ ] Implementar event store
  ```yaml
  .prisma/events/2025-01-15/
  ├── session-001-events.md
  ├── session-002-events.md
  └── daily-summary.yaml
  ```

- [ ] Criar eventos fundamentais
  - [ ] COMMAND_EXECUTED
  - [ ] DECISION_MADE
  - [ ] STATE_CHANGED
  - [ ] ERROR_OCCURRED

- [ ] Implementar event replay básico
  - [ ] Listar eventos de uma sessão
  - [ ] Reproduzir sequência de eventos
  - [ ] Gerar audit trail

- [ ] Validar rastreabilidade
  - [ ] Executar 5 comandos diferentes
  - [ ] Verificar eventos registrados
  - [ ] Replay funciona corretamente
  - [ ] Audit trail legível

#### Validation Gate:
```
✓ Todos os comandos geram eventos
✓ Eventos são imutáveis
✓ Replay reproduz estado
✓ Audit trail completo
```

**[MANUAL CHECKPOINT]**
- [ ] Event sourcing aprovado
- [ ] Ajustes necessários
- [ ] Continuar sem event sourcing

---

## 🚀 SEMANA 2: QUICK WINS VISÍVEIS

### CHECKPOINT 2.1: Living Documentation
**Objetivo**: Documentação executável

#### Tasks:
- [ ] Converter templates BMad para living docs
  - [ ] PRD template executável
  - [ ] Architecture template executável
  - [ ] Story template executável

- [ ] Implementar validação automática
  - [ ] Code blocks executam
  - [ ] Links são válidos
  - [ ] Exemplos funcionam

- [ ] Criar comando `/prisma doc-viva`
  - [ ] Converte markdown estático
  - [ ] Adiciona hooks de execução
  - [ ] Mantém formato legível

- [ ] Testar execução
  - [ ] Executar bloco de código em doc
  - [ ] Validar output esperado
  - [ ] Documentação auto-atualizada

#### Validation Gate:
```
✓ Docs executam comandos
✓ Exemplos são testáveis
✓ Validação automática funciona
✓ Backward compatible com docs BMad
```

**[MANUAL CHECKPOINT]**
- [ ] Living docs funcionando
- [ ] Precisa refinamento
- [ ] Skip para próxima feature

---

### CHECKPOINT 2.2: Visual Progress Tracking
**Objetivo**: Visualização hierárquica do progresso

#### Tasks:
- [ ] Implementar visualização ASCII
  ```
  📋 FASE 1: Análise [████████░░] 80%
  ├── ✅ CHECKPOINT 1: Setup
  ├── 🔄 CHECKPOINT 2: Implementação
  └── ⏳ CHECKPOINT 3: Validação
  ```

- [ ] Criar comando `/prisma status`
  - [ ] Mostra hierarquia completa
  - [ ] Percentual de conclusão
  - [ ] Tempo estimado restante

- [ ] Integrar com TodoWrite
  - [ ] Sync automático com todos
  - [ ] Atualização em tempo real
  - [ ] Cores ANSI quando disponível

- [ ] Validar visualização
  - [ ] Progress bar funciona
  - [ ] Hierarquia clara
  - [ ] Status atualiza corretamente

#### Validation Gate:
```
✓ Visualização clara e intuitiva
✓ Atualização em tempo real
✓ Funciona em terminal básico
✓ Informações úteis e precisas
```

**[MANUAL CHECKPOINT]**
- [ ] Visual tracking aprovado
- [ ] Ajustes de UX necessários
- [ ] Funcionalidade OK

---

### CHECKPOINT 2.3: Context Engineering Framework
**Objetivo**: Framework PRP básico

#### Tasks:
- [ ] Implementar gerador de PRP
  ```bash
  /prisma generate-prp story-1.md
  ```

- [ ] Criar estrutura PRP
  - [ ] CONTEXT section
  - [ ] REQUIREMENTS section
  - [ ] EXAMPLES section
  - [ ] VALIDATION section

- [ ] Implementar research automático
  - [ ] Análise de codebase
  - [ ] Detecção de patterns
  - [ ] Sugestão de abordagens

- [ ] Validar PRP generation
  - [ ] Gerar PRP de story existente
  - [ ] Executar PRP gerado
  - [ ] Validar resultado

#### Validation Gate:
```
✓ PRP gerado automaticamente
✓ Research encontra contexto
✓ Examples são executáveis
✓ Validation gates funcionam
```

**[MANUAL CHECKPOINT]**
- [ ] Context Engineering OK
- [ ] Refinamento necessário
- [ ] Prosseguir para próxima fase

---

## ✅ SEMANA 3: VALIDAÇÃO & REFINAMENTO

### CHECKPOINT 3.1: Teste com Usuários BMad
**Objetivo**: Validar com projetos reais

#### Tasks:
- [ ] Selecionar 3-5 projetos BMad ativos
- [ ] Instalar PRISMA em modo híbrido
- [ ] Documentar fricções encontradas
- [ ] Coletar feedback estruturado

#### Questions para Usuários:
- [ ] Comandos BMad continuam funcionando?
- [ ] Novos comandos PRISMA são intuitivos?
- [ ] Estado persistente ajuda?
- [ ] Visual tracking é útil?
- [ ] Algum breaking change detectado?

#### Validation Gate:
```
✓ Zero breaking changes reportados
✓ Features PRISMA agregam valor
✓ Usuários querem continuar usando
✓ Performance aceitável
```

**[MANUAL CHECKPOINT]**
- [ ] Feedback positivo - prosseguir
- [ ] Issues críticos - resolver primeiro
- [ ] Rollback completo necessário

---

### CHECKPOINT 3.2: Documentação de Migração
**Objetivo**: Guia completo BMad → PRISMA

#### Tasks:
- [ ] Criar guia de migração
  - [ ] Quick start (5 min)
  - [ ] Migração completa (30 min)
  - [ ] Troubleshooting comum

- [ ] Documentar command mappings
- [ ] Criar exemplos de uso
- [ ] Gravar video demo (opcional)

#### Validation Gate:
```
✓ Documentação clara e completa
✓ Exemplos funcionam
✓ FAQ cobre casos comuns
✓ Usuário consegue migrar sozinho
```

**[MANUAL CHECKPOINT]**
- [ ] Documentação aprovada
- [ ] Precisa mais detalhes
- [ ] Boa o suficiente para beta

---

### CHECKPOINT 3.3: Release Preparation
**Objetivo**: Preparar para lançamento

#### Tasks:
- [ ] Code review completo
- [ ] Testes de regressão
- [ ] Performance benchmarks
- [ ] Security review básico

- [ ] Criar release notes
  - [ ] New features
  - [ ] Known issues
  - [ ] Migration guide
  - [ ] Breaking changes (deve ser ZERO)

- [ ] Setup para rollback
  - [ ] Script de rollback pronto
  - [ ] Backup strategy clara
  - [ ] Plano de contingência

#### Final Validation Gate:
```
✓ Todos os checkpoints anteriores passed
✓ Zero breaking changes
✓ Performance aceitável
✓ Usuários beta aprovam
✓ Rollback testado e funcional
```

**[FINAL MANUAL CHECKPOINT]**
- [ ] ✅ APROVAR PARA PRODUÇÃO
- [ ] ⚠️ MAIS UMA SEMANA DE TESTES
- [ ] ❌ ROLLBACK E REPENSAR ABORDAGEM

---

## 📊 MÉTRICAS DE SUCESSO

### Quantitativas:
- [ ] 100% comandos BMad funcionando
- [ ] <5min para aprender PRISMA básico
- [ ] <200ms overhead por comando
- [ ] 0 breaking changes

### Qualitativas:
- [ ] Usuários veem valor imediato
- [ ] Migração é suave e opcional
- [ ] Features novas são intuitivas
- [ ] Documentação é clara

---

## 🚨 CRITÉRIOS DE ROLLBACK

Rollback IMEDIATO se:
- [ ] Qualquer comando BMad quebra
- [ ] Perda de dados detectada
- [ ] Performance degradada >50%
- [ ] Usuários não conseguem trabalhar

---

## 📝 NOTAS DE IMPLEMENTAÇÃO

**Prioridades:**
1. Compatibilidade absoluta
2. Valor incremental visível
3. Zero fricção na migração
4. Rollback sempre disponível

**Lembretes:**
- Test em projeto real após cada checkpoint
- Commit após cada validation gate passed
- Document todas as decisões
- Communicate mudanças claramente

---

**STATUS GERAL:** ⏳ AGUARDANDO INÍCIO

**Último Update:** [Data]
**Responsável:** [Nome]
**Próximo Checkpoint:** 1.1 - Setup Inicial

---

*Este checklist opera em MODO MANUAL - aprovação explícita necessária em cada checkpoint*