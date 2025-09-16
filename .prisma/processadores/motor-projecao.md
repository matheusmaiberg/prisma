# Motor de Projeção - Event Sourcing PRISMA

## 📌 O que é?

O Motor de Projeção reconstrói o estado do sistema a partir da sequência de eventos. É como assistir a um filme quadro a quadro para entender a cena completa.

## 🔄 Como Funciona

### 1. Leitura de Eventos
```yaml
processo:
  1. Carrega stream de eventos
  2. Valida integridade (hashes)
  3. Aplica eventos em ordem
  4. Gera estado projetado
```

### 2. Tipos de Projeção

#### Estado Atual
Reconstrói o estado completo do projeto:
- Todas as decisões ativas
- Contexto descoberto
- Tarefas em andamento
- Configurações atuais

#### Histórico de Decisões
Cria audit trail completo:
- Quem decidiu o quê
- Quando e por quê
- Alternativas consideradas
- Impactos e reversões

#### Linha do Tempo
Visualização cronológica:
- Eventos por timestamp
- Agrupamento por sessão
- Filtros por tipo/agente

## 📊 Exemplo de Projeção

### Input: Stream de Eventos
```yaml
eventos:
  - tipo: contexto_descoberto
    dados: {tecnologia: "Next.js"}
  - tipo: decisao_tomada
    dados: {decisao: "Usar Tailwind"}
  - tipo: tarefa_criada
    dados: {titulo: "Setup projeto"}
```

### Output: Estado Projetado
```yaml
estado_atual:
  contexto:
    tecnologias: ["Next.js"]
    decisoes_ativas: ["Usar Tailwind"]
  tarefas:
    pendentes: ["Setup projeto"]
    em_progresso: []
    concluidas: []
```

## 🚀 Comandos de Uso

### Reprojetar Estado Completo
```bash
/prisma projetar estado-completo
```

### Gerar Audit Trail
```bash
/prisma projetar decisoes --desde "2025-01-01"
```

### Visualizar Timeline
```bash
/prisma projetar timeline --sessao atual
```

## ⚡ Otimizações

### Uso de Snapshots
- Não precisa reprojetar desde o início
- Aplica apenas eventos após snapshot
- Reduz tempo de reconstrução de horas para segundos

### Cache de Projeções
- Projeções frequentes são cacheadas
- Atualização incremental
- Invalidação automática

## 🔒 Garantias

1. **Consistência**: Estado sempre deriva dos eventos
2. **Auditabilidade**: Todo caminho é rastreável
3. **Reversibilidade**: Pode voltar a qualquer ponto
4. **Determinismo**: Mesmos eventos = mesmo estado

## 📈 Métricas

- Tempo de projeção: < 100ms para 1000 eventos
- Taxa de cache hit: > 90%
- Precisão: 100% (determinístico)

---

*Motor de Projeção PRISMA - Reconstruindo contexto, evento por evento*