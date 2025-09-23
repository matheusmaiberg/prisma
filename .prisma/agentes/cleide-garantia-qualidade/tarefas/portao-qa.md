<!-- Powered by PRISMA™ -->

# portao-qa

Criar ou atualizar um arquivo de decisão do portão de qualidade para uma história baseado em achados de revisão.

## Propósito

Gerar um arquivo de portão de qualidade independente que fornece uma decisão clara de aprovado/reprovado com feedback acionável. Este portão serve como um ponto de verificação consultivo para equipes entenderem o status da qualidade.

## Pré-requisitos

- História foi revisada (manualmente ou via tarefa revisar-historia)
- Achados de revisão estão disponíveis
- Entendimento dos requisitos da história e implementação

## Localização do Arquivo do Portão

**SEMPRE** verificar o `bmad-core/core-config.yaml` para o `qa.qaLocation/gates`

Regras de slug:

- Converter para minúsculas
- Substituir espaços por hifens
- Remover pontuação
- Exemplo: "User Auth - Login!" se torna "user-auth-login"

## Schema Mínimo Requerido

```yaml
schema: 1
story: '{epic}.{story}'
gate: PASS|CONCERNS|FAIL|WAIVED
status_reason: 'Explicação de 1-2 sentenças da decisão do portão'
reviewer: 'Quinn'
updated: '{timestamp ISO-8601}'
top_issues: [] # Array vazio se não houver problemas
waiver: { active: false } # Apenas definir active: true se WAIVED
```

## Schema com Problemas

```yaml
schema: 1
story: '1.3'
gate: CONCERNS
status_reason: 'Falta limitação de taxa nos endpoints de autenticação representa risco de segurança.'
reviewer: 'Quinn'
updated: '2025-01-12T10:15:00Z'
top_issues:
  - id: 'SEC-001'
    severity: high # APENAS: low|medium|high
    finding: 'Sem limitação de taxa no endpoint de login'
    suggested_action: 'Adicionar middleware de limitação de taxa antes da produção'
  - id: 'TEST-001'
    severity: medium
    finding: 'Sem testes de integração para fluxo de autenticação'
    suggested_action: 'Adicionar cobertura de teste de integração'
waiver: { active: false }
```

## Schema quando Dispensado

```yaml
schema: 1
story: '1.3'
gate: WAIVED
status_reason: 'Problemas conhecidos aceitos para release MVP.'
reviewer: 'Quinn'
updated: '2025-01-12T10:15:00Z'
top_issues:
  - id: 'PERF-001'
    severity: low
    finding: 'Dashboard carrega lentamente com mais de 1000 itens'
    suggested_action: 'Implementar paginação na próxima sprint'
waiver:
  active: true
  reason: 'Release MVP - otimização de performance adiada'
  approved_by: 'Product Owner'
```

## Critérios de Decisão do Portão

### PASS

- Todos os critérios de aceitação atendidos
- Nenhum problema de alta severidade
- Cobertura de testes atende padrões do projeto

### CONCERNS

- Problemas não-bloqueantes presentes
- Devem ser rastreados e agendados
- Pode prosseguir com consciência

### FAIL

- Critérios de aceitação não atendidos
- Problemas de alta severidade presentes
- Recomenda retorno para InProgress

### WAIVED

- Problemas explicitamente aceitos
- Requer aprovação e razão
- Prosseguir apesar de problemas conhecidos

## Escala de Severidade

**VALORES FIXOS - SEM VARIAÇÕES:**

- `low`: Problemas menores, problemas cosméticos
- `medium`: Deve corrigir em breve, não bloqueante
- `high`: Problemas críticos, deve bloquear release

## Prefixos de ID de Problemas

- `SEC-`: Problemas de segurança
- `PERF-`: Problemas de performance
- `REL-`: Problemas de confiabilidade
- `TEST-`: Lacunas de teste
- `MNT-`: Preocupações de manutenibilidade
- `ARCH-`: Problemas de arquitetura
- `DOC-`: Lacunas de documentação
- `REQ-`: Problemas de requisitos

## Requisitos de Saída

1. **SEMPRE** criar arquivo do portão em: `qa.qaLocation/gates` do `bmad-core/core-config.yaml`
2. **SEMPRE** anexar este formato exato à seção QA Results da história:

   ```text
   Gate: {STATUS} → qa.qaLocation/gates/{epic}.{story}-{slug}.yml
   ```

3. Manter status_reason com máximo de 1-2 sentenças
4. Usar valores de severidade exatamente: `low`, `medium`, ou `high`

## Exemplo de Atualização da História

Após criar arquivo do portão, anexar à seção QA Results da história:

```markdown
## Resultados QA

### Data da Revisão: 2025-01-12

### Revisado Por: Quinn (Arquiteto de Testes)

[... conteúdo de revisão existente ...]

### Status do Portão

Gate: CONCERNS → qa.qaLocation/gates/{epic}.{story}-{slug}.yml
```

## Princípios Chave

- Manter mínimo e previsível
- Escala de severidade fixa (low/medium/high)
- Sempre escrever no caminho padrão
- Sempre atualizar história com referência do portão
- Achados claros e acionáveis