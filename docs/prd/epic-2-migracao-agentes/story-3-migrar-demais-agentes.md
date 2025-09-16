# Story: Migrar Demais Agentes (Lote)

## 📋 Informações da Story
**Epic**: Migração de Agentes
**Prioridade**: P1 - Alta
**Estimativa**: 13 pontos
**Sprint**: 3-4
**Dependências**: story-2-migrar-desenvolvedor

---

## História de Usuário

**Como** usuário do sistema PRISMA
**Quero** todos os agentes especializados em português
**Para** ter acesso completo às funcionalidades do sistema

## Contexto Completo

### Agentes para Migrar
1. **analyst** → **analista** (3 pontos)
2. **architect** → **arquiteto** (2 pontos)
3. **pm** → **gerente-projeto** (2 pontos)
4. **po** → **product-owner** (2 pontos)
5. **qa** → **qualidade** (2 pontos)
6. **sm** → **scrum-master** (1 ponto)
7. **ux-expert** → **especialista-ux** (1 ponto)

### Objetivo
Migrar todos os 7 agentes restantes seguindo o padrão estabelecido com orquestrador e desenvolvedor.

## Critérios de Aceitação por Agente

### Para CADA agente:
- [ ] Estrutura de diretório criada
- [ ] index.md traduzido e adaptado
- [ ] Componentes modularizados
- [ ] Config.yaml criado
- [ ] Comandos específicos traduzidos
- [ ] Retrocompatibilidade testada
- [ ] Documentação atualizada

## Especificação Técnica

### Padrão de Estrutura
```
agentes/
├── [nome-agente]/
│   ├── index.md
│   ├── config.yaml
│   └── componentes/
│       └── [componentes-especificos].md
```

### Mapeamento de Tradução

| Agente BMAD | Agente PRISMA | Foco Principal |
|-------------|---------------|----------------|
| analyst | analista | Análise de requisitos |
| architect | arquiteto | Design de soluções |
| pm | gerente-projeto | Gestão de projeto |
| po | product-owner | Visão de produto |
| qa | qualidade | Testes e validação |
| sm | scrum-master | Facilitação ágil |
| ux-expert | especialista-ux | Design e usabilidade |

### Comandos Comuns Traduzidos

| Inglês | Português |
|--------|-----------|
| analyze | analisar |
| design | projetar |
| plan | planejar |
| validate | validar |
| test | testar |
| review | revisar |
| prioritize | priorizar |

## Plano de Migração em Lote

### Sprint 3: Agentes Críticos
1. **Analista** (3 dias)
   - Análise de requisitos
   - Documentação de processos
   - Elicitação

2. **Arquiteto** (2 dias)
   - Design de sistemas
   - Diagramas técnicos
   - Padrões

3. **Qualidade** (2 dias)
   - Testes automatizados
   - Validação
   - Relatórios

### Sprint 4: Agentes de Gestão
1. **Gerente-Projeto** (2 dias)
   - Planejamento
   - Cronogramas
   - Recursos

2. **Product-Owner** (2 dias)
   - Backlog
   - Priorização
   - Visão produto

3. **Scrum-Master** (1 dia)
   - Cerimônias
   - Facilitação
   - Métricas

4. **Especialista-UX** (1 dia)
   - Design interfaces
   - Usabilidade
   - Protótipos

## Processo de Migração Padrão

Para cada agente:

1. **Análise** (2h)
   - Ler arquivo BMAD original
   - Identificar comandos únicos
   - Mapear dependências

2. **Tradução** (4h)
   - Converter para português
   - Adaptar contexto cultural
   - Manter funcionalidades

3. **Implementação** (4h)
   - Criar estrutura
   - Modularizar componentes
   - Configurar herança

4. **Testes** (3h)
   - Testar comandos
   - Validar retrocompatibilidade
   - Verificar integração

5. **Documentação** (2h)
   - Atualizar docs
   - Criar exemplos
   - Registrar mudanças

## Checklist de Validação Geral

- [ ] Todos 7 agentes migrados
- [ ] 100% comandos traduzidos
- [ ] Retrocompatibilidade total
- [ ] Testes passando para todos
- [ ] Documentação completa
- [ ] Orquestrador reconhece todos
- [ ] Adaptador atualizado

## Definição de Pronto

- [x] 7 agentes funcionando em PRISMA
- [x] Comandos BMAD mantidos
- [x] Suite de testes completa
- [x] Documentação finalizada
- [x] Review e aprovação
- [x] Deploy incremental

## Notas Adicionais

- Seguir padrão dos primeiros 2 agentes
- Reusar componentes de _compartilhado
- Manter consistência de tradução
- Validar com usuários de cada papel
- Considerar ordem de dependências

## Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Inconsistência entre agentes | Template padrão, revisão cruzada |
| Fadiga na migração | Pausas entre agentes, rotação de devs |
| Funcionalidade perdida | Checklist detalhado por agente |
| Confusão de papéis | Documentação clara de responsabilidades |

---
*Story fragmentada do PRD principal*
*Última atualização: 2025-09-16*