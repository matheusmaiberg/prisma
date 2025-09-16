# Story: Criar Validador de Migração

## 📋 Informações da Story
**Epic**: Ferramentas de Suporte
**Prioridade**: P1 - Alta
**Estimativa**: 3 pontos
**Sprint**: 4
**Dependências**: story-1-criar-conversor

---

## História de Usuário

**Como** QA validando a migração
**Quero** uma ferramenta que valida automaticamente componentes migrados
**Para** garantir que nada foi perdido ou corrompido na migração

## Contexto Completo

### Situação Atual
- Migração manual propensa a erros
- Difícil validar completude
- Sem forma automatizada de verificar integridade
- Risco de regressões não detectadas

### Objetivo
Criar `ferramentas/validacao/validador.md` que verifica automaticamente se componentes migrados mantêm paridade com originais BMAD.

## Critérios de Aceitação

- [ ] Valida estrutura de agentes migrados
- [ ] Compara comandos BMAD vs PRISMA
- [ ] Verifica integridade de templates
- [ ] Testa retrocompatibilidade
- [ ] Gera relatório detalhado
- [ ] Identifica elementos faltantes
- [ ] Sugere correções

## Especificação Técnica

### Componentes do Validador

```typescript
interface ValidadorMigracao {
  // Validação de Agente
  validarAgente(
    agenteBMAD: string,
    agentePRISMA: string
  ): ResultadoValidacao;

  // Validação de Template
  validarTemplate(
    templateBMAD: string,
    templatePRISMA: string
  ): ResultadoValidacao;

  // Validação de Comando
  validarComando(
    comandoBMAD: string,
    esperadoPRISMA: string
  ): boolean;

  // Validação Completa
  validarSistema(): RelatorioCompleto;
}
```

### Checklist de Validação

```yaml
validacao_agente:
  estrutura:
    - existe_index_md: true
    - existe_config_yaml: true
    - existe_componentes_dir: true

  conteudo:
    - comandos_traduzidos: 100%
    - persona_adaptada: true
    - capacidades_preservadas: true

  funcionalidade:
    - ativacao_bmad: funciona
    - ativacao_prisma: funciona
    - comandos_executam: true

validacao_template:
  formato:
    - markdown_valido: true
    - variaveis_preservadas: true
    - estrutura_mantida: true

  conteudo:
    - traducao_completa: true
    - referencias_atualizadas: true
    - exemplos_funcionam: true
```

### Relatório de Validação

```markdown
# Relatório de Validação - BMAD → PRISMA

## Resumo
- Data: 2025-01-16
- Componentes Validados: 15
- Taxa de Sucesso: 95%
- Issues Encontrados: 3

## Agentes
| Agente | Status | Cobertura | Issues |
|--------|--------|-----------|--------|
| orquestrador | ✅ | 100% | 0 |
| desenvolvedor | ✅ | 98% | 1 |
| analista | ⚠️ | 95% | 2 |

## Templates
| Template | Status | Validação |
|----------|--------|-----------|
| prd-tmpl | ✅ | Completo |
| story-tmpl | ✅ | Completo |
| arch-tmpl | ⚠️ | Variáveis |

## Issues Detalhados
1. [HIGH] Comando faltante em analista
2. [MED] Variável não traduzida em arch-tmpl
3. [LOW] Formatação inconsistente

## Recomendações
- Corrigir issues HIGH imediatamente
- Revisar traduções de variáveis
- Executar revalidação após correções
```

## Tarefas de Implementação

1. **Criar estrutura validador**
   ```bash
   mkdir -p ferramentas/validacao
   touch ferramentas/validacao/validador.md
   ```

2. **Implementar comparador**
   - Ler arquivos BMAD e PRISMA
   - Extrair elementos chave
   - Comparar estrutura e conteúdo

3. **Implementar analisador**
   - Identificar comandos
   - Mapear traduções
   - Verificar completude

4. **Implementar testador**
   - Executar comandos
   - Validar respostas
   - Medir performance

5. **Implementar gerador relatório**
   - Consolidar resultados
   - Formatar markdown
   - Gerar métricas

6. **Criar automação**
   ```bash
   # Validar agente específico
   /prisma validar agente desenvolvedor

   # Validar todos componentes
   /prisma validar --completo

   # Validar com correção automática
   /prisma validar --auto-fix
   ```

## Casos de Validação

### Caso 1: Agente Completo
```bash
Validando: orquestrador
✅ Estrutura: OK
✅ Comandos: 15/15
✅ Retrocompat: OK
✅ Performance: 45ms
Status: APROVADO
```

### Caso 2: Template com Issues
```bash
Validando: prd-template
✅ Estrutura: OK
⚠️ Variáveis: 2 não traduzidas
✅ Formato: OK
❌ Exemplos: 1 quebrado
Status: REQUER CORREÇÃO
```

### Caso 3: Sistema Completo
```bash
Validação Completa PRISMA
Agentes: 9/9 ✅
Templates: 12/15 ⚠️
Workflows: 6/6 ✅
Taxa Geral: 90%
Recomendação: Corrigir templates antes de deploy
```

## Métricas de Validação

| Métrica | Alvo | Crítico |
|---------|------|---------|
| Cobertura Comandos | 100% | <95% |
| Retrocompatibilidade | 100% | <100% |
| Performance Overhead | <100ms | >200ms |
| Traduções Corretas | 100% | <98% |
| Estrutura Válida | 100% | <100% |

## Definição de Pronto

- [x] Validador implementado
- [x] Cobre todos tipos de componente
- [x] Relatórios gerados automaticamente
- [x] Integrado ao CI/CD
- [x] Documentação completa
- [x] Modo auto-fix funcionando

## Notas Adicionais

- Executar após cada migração
- Integrar ao pipeline de deploy
- Manter histórico de validações
- Alertas para degradação
- Considerar validação incremental

## Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Falsos positivos | Ajuste fino de regras |
| Validação incompleta | Checklist exaustivo |
| Performance lenta | Cache e paralelização |
| Correção automática falha | Modo dry-run primeiro |

---
*Story fragmentada do PRD principal*
*Última atualização: 2025-09-16*