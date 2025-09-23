<!-- Powered by PRISMA™ -->

# perfil-risco

Gerar uma matriz abrangente de avaliação de risco para implementação de história usando análise probabilidade × impacto.

## Entradas

```yaml
required:
  - story_id: '{epic}.{story}' # ex: "1.3"
  - story_path: 'docs/stories/{epic}.{story}.*.md'
  - story_title: '{title}' # Se ausente, derivar do H1 do arquivo da história
  - story_slug: '{slug}' # Se ausente, derivar do título (minúsculas, hifenizado)
```

## Propósito

Identificar, avaliar e priorizar riscos na implementação da história. Fornecer estratégias de mitigação de risco e áreas de foco de teste baseadas nos níveis de risco.

## Framework de Avaliação de Risco

### Categorias de Risco

**Prefixos de Categoria:**

- `TECH`: Riscos Técnicos
- `SEC`: Riscos de Segurança
- `PERF`: Riscos de Performance
- `DATA`: Riscos de Dados
- `BUS`: Riscos de Negócio
- `OPS`: Riscos Operacionais

1. **Riscos Técnicos (TECH)**
   - Complexidade de arquitetura
   - Desafios de integração
   - Débito técnico
   - Preocupações de escalabilidade
   - Dependências de sistema

2. **Riscos de Segurança (SEC)**
   - Falhas de autenticação/autorização
   - Vulnerabilidades de exposição de dados
   - Ataques de injeção
   - Problemas de gerenciamento de sessão
   - Fraquezas criptográficas

3. **Riscos de Performance (PERF)**
   - Degradação de tempo de resposta
   - Gargalos de throughput
   - Exaustão de recursos
   - Otimização de consulta de banco de dados
   - Falhas de cache

4. **Riscos de Dados (DATA)**
   - Potencial de perda de dados
   - Corrupção de dados
   - Violações de privacidade
   - Problemas de conformidade
   - Lacunas de backup/recuperação

5. **Riscos de Negócio (BUS)**
   - Recurso não atende necessidades do usuário
   - Impacto na receita
   - Dano à reputação
   - Não conformidade regulatória
   - Timing de mercado

6. **Riscos Operacionais (OPS)**
   - Falhas de implantação
   - Lacunas de monitoramento
   - Prontidão de resposta a incidentes
   - Inadequação de documentação
   - Problemas de transferência de conhecimento

## Processo de Análise de Risco

### 1. Identificação de Risco

Para cada categoria, identificar riscos específicos:

```yaml
risk:
  id: 'SEC-001' # Usar prefixos: SEC, PERF, DATA, BUS, OPS, TECH
  category: security
  title: 'Validação de entrada insuficiente em formulários de usuário'
  description: 'Entradas de formulário não devidamente sanitizadas podem levar a ataques XSS'
  affected_components:
    - 'UserRegistrationForm'
    - 'ProfileUpdateForm'
  detection_method: 'Revisão de código revelou validação ausente'
```

### 2. Avaliação de Risco

Avaliar cada risco usando probabilidade × impacto:

**Níveis de Probabilidade:**

- `Alta (3)`: Provável de ocorrer (>70% chance)
- `Média (2)`: Possível ocorrência (30-70% chance)
- `Baixa (1)`: Improvável de ocorrer (<30% chance)

**Níveis de Impacto:**

- `Alto (3)`: Consequências severas (violação de dados, sistema down, grande perda financeira)
- `Médio (2)`: Consequências moderadas (performance degradada, pequenos problemas de dados)
- `Baixo (1)`: Consequências menores (problemas cosméticos, pequeno inconveniente)

### Pontuação de Risco = Probabilidade × Impacto

- 9: Risco Crítico (Vermelho)
- 6: Risco Alto (Laranja)
- 4: Risco Médio (Amarelo)
- 2-3: Risco Baixo (Verde)
- 1: Risco Mínimo (Azul)

### 3. Priorização de Risco

Criar matriz de risco:

```markdown
## Matriz de Risco

| ID Risco | Descrição               | Probabilidade | Impacto    | Pontuação | Prioridade |
| -------- | ----------------------- | ------------- | ---------- | --------- | ---------- |
| SEC-001  | Vulnerabilidade XSS     | Alta (3)      | Alto (3)   | 9         | Crítico    |
| PERF-001 | Query lenta no dashboard| Média (2)     | Médio (2)  | 4         | Médio      |
| DATA-001 | Falha de backup         | Baixa (1)     | Alto (3)   | 3         | Baixo      |
```

### 4. Estratégias de Mitigação de Risco

Para cada risco identificado, fornecer mitigação:

```yaml
mitigation:
  risk_id: 'SEC-001'
  strategy: 'preventive' # preventive|detective|corrective
  actions:
    - 'Implementar biblioteca de validação de entrada (ex: validator.js)'
    - 'Adicionar headers CSP para prevenir execução XSS'
    - 'Sanitizar todas as entradas de usuário antes do armazenamento'
    - 'Escapar todas as saídas em templates'
  testing_requirements:
    - 'Teste de segurança com OWASP ZAP'
    - 'Teste de penetração manual de formulários'
    - 'Testes unitários para funções de validação'
  residual_risk: 'Baixo - Algumas vulnerabilidades zero-day podem permanecer'
  owner: 'dev'
  timeline: 'Antes da implantação'
```

## Saídas

### Saída 1: Bloco YAML do Portão

Gerar para colar no arquivo de portão sob `risk_summary`:

**Regras de saída:**

- Incluir apenas riscos avaliados; não emitir placeholders
- Ordenar riscos por pontuação (desc) ao emitir highest e quaisquer listas tabulares
- Se nenhum risco: totais todos zeros, omitir highest, manter arrays de recomendações vazios

```yaml
# risk_summary (colar no arquivo de portão):
risk_summary:
  totals:
    critical: X # pontuação 9
    high: Y # pontuação 6
    medium: Z # pontuação 4
    low: W # pontuação 2-3
  highest:
    id: SEC-001
    score: 9
    title: 'XSS no formulário de perfil'
  recommendations:
    must_fix:
      - 'Adicionar sanitização de entrada & CSP'
    monitor:
      - 'Adicionar alertas de segurança para endpoints de autenticação'
```

### Saída 2: Relatório Markdown

**Salvar em:** `qa.qaLocation/assessments/{epic}.{story}-risco-{YYYYMMDD}.md`

```markdown
# Perfil de Risco: História {epic}.{story}

Data: {date}
Revisor: Quinn (Arquiteto de Testes)

## Resumo Executivo

- Total de Riscos Identificados: X
- Riscos Críticos: Y
- Riscos Altos: Z
- Pontuação de Risco: XX/100 (calculada)

## Riscos Críticos Requerendo Atenção Imediata

### 1. [ID]: Título do Risco

**Pontuação: 9 (Crítico)**
**Probabilidade**: Alta - Raciocínio detalhado
**Impacto**: Alto - Consequências potenciais
**Mitigação**:

- Ação imediata requerida
- Passos específicos a tomar
  **Foco de Teste**: Cenários de teste específicos necessários

## Distribuição de Risco

### Por Categoria

- Segurança: X riscos (Y críticos)
- Performance: X riscos (Y críticos)
- Dados: X riscos (Y críticos)
- Negócio: X riscos (Y críticos)
- Operacional: X riscos (Y críticos)

### Por Componente

- Frontend: X riscos
- Backend: X riscos
- Banco de Dados: X riscos
- Infraestrutura: X riscos

## Registro Detalhado de Riscos

[Tabela completa de todos os riscos com pontuações e mitigações]

## Estratégia de Teste Baseada em Risco

### Prioridade 1: Testes de Risco Crítico

- Cenários de teste para riscos críticos
- Tipos de teste requeridos (segurança, carga, caos)
- Requisitos de dados de teste

### Prioridade 2: Testes de Risco Alto

- Cenários de teste de integração
- Cobertura de casos extremos

### Prioridade 3: Testes de Risco Médio/Baixo

- Testes funcionais padrão
- Suite de teste de regressão

## Critérios de Aceitação de Risco

### Deve Corrigir Antes da Produção

- Todos os riscos críticos (pontuação 9)
- Riscos altos afetando segurança/dados

### Pode Implantar com Mitigação

- Riscos médios com controles compensatórios
- Riscos baixos com monitoramento no lugar

### Riscos Aceitos

- Documentar quaisquer riscos que a equipe aceita
- Incluir aprovação da autoridade apropriada

## Requisitos de Monitoramento

Monitoramento pós-implantação para:

- Métricas de performance para riscos PERF
- Alertas de segurança para riscos SEC
- Taxas de erro para riscos operacionais
- KPIs de negócio para riscos de negócio

## Gatilhos de Revisão de Risco

Revisar e atualizar perfil de risco quando:

- Arquitetura muda significativamente
- Novas integrações adicionadas
- Vulnerabilidades de segurança descobertas
- Problemas de performance reportados
- Requisitos regulatórios mudam
```

## Algoritmo de Pontuação de Risco

Calcular pontuação geral de risco da história:

```text
Pontuação Base = 100
Para cada risco:
  - Crítico (9): Deduzir 20 pontos
  - Alto (6): Deduzir 10 pontos
  - Médio (4): Deduzir 5 pontos
  - Baixo (2-3): Deduzir 2 pontos

Pontuação mínima = 0 (extremamente arriscado)
Pontuação máxima = 100 (risco mínimo)
```

## Recomendações Baseadas em Risco

Baseado no perfil de risco, recomendar:

1. **Prioridade de Teste**
   - Quais testes executar primeiro
   - Tipos de teste adicionais necessários
   - Requisitos de ambiente de teste

2. **Foco de Desenvolvimento**
   - Áreas de ênfase de revisão de código
   - Validação adicional necessária
   - Controles de segurança a implementar

3. **Estratégia de Implantação**
   - Rollout faseado para mudanças de alto risco
   - Feature flags para recursos arriscados
   - Procedimentos de rollback

4. **Configuração de Monitoramento**
   - Métricas a rastrear
   - Alertas a configurar
   - Requisitos de dashboard

## Integração com Portões de Qualidade

**Mapeamento determinístico de portão:**

- Qualquer risco com pontuação ≥ 9 → Portão = FAIL (a menos que dispensado)
- Senão se qualquer pontuação ≥ 6 → Portão = CONCERNS
- Senão → Portão = PASS
- Riscos não mitigados → Documentar no portão

### Saída 3: Linha de Hook da História

**Imprimir esta linha para tarefa de revisão citar:**

```text
Perfil de risco: qa.qaLocation/assessments/{epic}.{story}-risco-{YYYYMMDD}.md
```

## Princípios Chave

- Identificar riscos cedo e sistematicamente
- Usar pontuação consistente probabilidade × impacto
- Fornecer estratégias de mitigação acionáveis
- Vincular riscos a requisitos específicos de teste
- Rastrear risco residual após mitigação
- Atualizar perfil de risco conforme história evolui