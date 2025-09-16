# Story: Testar Compatibilidade BMAD↔PRISMA

## 📋 Informações da Story
**Epic**: Mapeamento e Configuração Base
**Prioridade**: P0 - Crítica
**Estimativa**: 3 pontos
**Sprint**: 1
**Dependências**: story-2-implementar-adaptador

---

## História de Usuário

**Como** QA responsável pela migração
**Quero** validar que todos comandos BMAD funcionam via adaptador
**Para** garantir zero breaking changes para usuários existentes

## Contexto Completo

### Situação Atual
- Adaptador foi implementado (story anterior)
- Config de mapeamento existe
- Nenhum teste de compatibilidade executado
- Risco de comandos quebrarem silenciosamente

### Objetivo
Criar e executar suite completa de testes de compatibilidade, validando que 100% dos comandos BMAD continuam funcionando através do adaptador.

## Critérios de Aceitação

- [ ] Suite de testes cobrindo todos comandos BMAD
- [ ] Testes de regressão automatizados
- [ ] Validação de resposta (formato e conteúdo)
- [ ] Testes de performance (<100ms overhead)
- [ ] Testes de edge cases
- [ ] Relatório de cobertura >95%
- [ ] CI/CD pipeline configurado

## Especificação Técnica

### Categorias de Teste

```yaml
testes_compatibilidade:
  comandos_basicos:
    - entrada: "*help"
      saida_esperada: "lista de comandos"
      tipo: exato

    - entrada: "*status"
      saida_esperada: "estado do sistema"
      tipo: contém

  comandos_agente:
    - entrada: "*agent dev"
      validar:
        - agente_ativado: desenvolvedor
        - mensagem_sucesso: true

    - entrada: "*agent invalid"
      validar:
        - erro: true
        - sugestao: true

  comandos_workflow:
    - entrada: "*workflow brownfield-service"
      validar:
        - workflow_iniciado: existente-servico
        - passos_carregados: true

  parametros_complexos:
    - entrada: "*task create --name 'Test Task' --priority high"
      validar:
        - task_criada: true
        - nome: "Test Task"
        - prioridade: "alta"
```

### Matriz de Testes

| Categoria | Qtd Testes | Cobertura | Status |
|-----------|------------|-----------|--------|
| Comandos Básicos | 15 | 100% | ⏳ |
| Agentes | 27 | 100% | ⏳ |
| Tasks | 20 | 100% | ⏳ |
| Workflows | 18 | 100% | ⏳ |
| Edge Cases | 10 | 100% | ⏳ |
| Performance | 5 | 100% | ⏳ |

## Tarefas de Implementação

1. **Setup ambiente de testes**
   ```bash
   mkdir -p tests/compatibilidade
   mkdir -p tests/fixtures
   mkdir -p tests/reports
   ```

2. **Criar fixtures de teste**
   - Comandos BMAD reais coletados
   - Respostas esperadas documentadas
   - Casos de erro conhecidos

3. **Implementar teste unitários**
   - Teste por componente do adaptador
   - Mocks para dependências
   - Asserts específicos

4. **Implementar testes de integração**
   - Fluxo completo BMAD→Adaptador→PRISMA
   - Validação end-to-end
   - Testes com dados reais

5. **Testes de performance**
   - Benchmark sem adaptador
   - Benchmark com adaptador
   - Análise de overhead
   - Testes de carga

6. **Testes de regressão**
   - Snapshot testing
   - Comparação com BMAD puro
   - Detecção de mudanças

## Plano de Execução de Testes

### Fase 1: Smoke Tests
```bash
# Testes básicos de sanidade
test_bmad_help()
test_bmad_agent_activation()
test_bmad_simple_task()
```

### Fase 2: Testes Completos
```bash
# Suite completa
run_all_command_tests()
run_all_agent_tests()
run_all_workflow_tests()
```

### Fase 3: Stress Tests
```bash
# Testes de carga
parallel_command_test(100)
rapid_succession_test()
memory_leak_test()
```

## Critérios de Aprovação

### Verde (Prosseguir)
- 100% comandos básicos passando
- 100% agentes funcionando
- Performance <100ms overhead
- Zero memory leaks

### Amarelo (Revisar)
- >95% testes passando
- Issues menores identificados
- Performance <150ms overhead
- Workarounds documentados

### Vermelho (Bloquear)
- <95% testes passando
- Comandos críticos falhando
- Performance >200ms overhead
- Memory leaks detectados

## Relatório de Testes

### Template de Relatório
```markdown
# Relatório de Compatibilidade BMAD→PRISMA

## Resumo Executivo
- Total de Testes: X
- Passando: Y (Z%)
- Falhando: A (B%)
- Performance Média: Cms

## Detalhes por Categoria
[Tabela com resultados]

## Issues Encontrados
[Lista de problemas]

## Recomendações
[Próximos passos]
```

## Definição de Pronto

- [x] Todos testes implementados
- [x] >95% testes passando
- [x] Performance validada
- [x] Relatório gerado
- [x] Issues documentados
- [x] CI/CD integrado
- [x] Aprovação do QA

## Notas Adicionais

- Testes devem rodar em <5 minutos
- Automatizar para rodar em cada PR
- Manter histórico de resultados
- Alertas para degradação de performance
- Considerar testes A/B com usuários reais

## Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Testes incompletos | Checklist de comandos BMAD |
| False positives | Validação manual sample |
| Ambiente diferente de produção | Testes em staging |
| Regressões futuras | CI/CD bloqueante |

---
*Story fragmentada do PRD principal*
*Última atualização: 2025-09-16*