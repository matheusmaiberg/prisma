<!-- Desenvolvido por BMAD™ Core -->

# Tarefa: Criar História para Sistema Legado

## Propósito

Criar uma única história de usuário para melhorias muito pequenas em sistemas legados que podem ser concluídas em uma única sessão de desenvolvimento focada. Esta tarefa é para adições mínimas ou correções de bugs que requerem consciência da integração com sistemas existentes.

## Quando Usar Esta Tarefa

**Use esta tarefa quando:**

- A melhoria pode ser concluída em uma única história
- Nenhuma nova arquitetura ou design significativo é necessário
- A mudança segue padrões existentes exatamente
- A integração é direta com risco mínimo
- A mudança é isolada com limites claros

**Use criar-epico-sistema-legado quando:**

- A melhoria requer 2-3 histórias coordenadas
- Algum trabalho de design é necessário
- Múltiplos pontos de integração estão envolvidos

**Use o processo completo de PRD/Arquitetura para sistema legado quando:**

- A melhoria requer múltiplas histórias coordenadas
- Planejamento arquitetural é necessário
- Trabalho significativo de integração é requerido

## Instruções

### 1. Avaliação Rápida do Projeto

Colete contexto mínimo mas essencial sobre o projeto existente:

**Contexto do Sistema Atual:**

- [ ] Funcionalidade existente relevante identificada
- [ ] Stack tecnológico para esta área anotado
- [ ] Ponto(s) de integração claramente compreendidos
- [ ] Padrões existentes para trabalho similar identificados

**Escopo da Mudança:**

- [ ] Mudança específica claramente definida
- [ ] Limites de impacto identificados
- [ ] Critérios de sucesso estabelecidos

### 2. Criação da História

Crie uma única história focada seguindo esta estrutura:

#### Título da História

{{Melhoria Específica}} - Adição para Sistema Legado

#### História do Usuário

Como um {{tipo de usuário}},
Eu quero {{ação/capacidade específica}},
Para que {{benefício/valor claro}}.

#### Contexto da História

**Integração com Sistema Existente:**

- Integra com: {{componente/sistema existente}}
- Tecnologia: {{stack tecnológico relevante}}
- Segue padrão: {{padrão existente a seguir}}
- Pontos de contato: {{pontos específicos de integração}}

#### Critérios de Aceitação

**Requisitos Funcionais:**

1. {{Requisito funcional primário}}
2. {{Requisito funcional secundário (se houver)}}
3. {{Requisito de integração}}

**Requisitos de Integração:**

4. {{Funcionalidade relevante}} existente continua funcionando inalterada
5. Nova funcionalidade segue padrão {{padrão}} existente
6. Integração com {{sistema/componente}} mantém comportamento atual

**Requisitos de Qualidade:**

7. Mudança é coberta por testes apropriados
8. Documentação é atualizada se necessário
9. Nenhuma regressão na funcionalidade existente verificada

#### Notas Técnicas

- **Abordagem de Integração:** {{como se conecta ao sistema existente}}
- **Referência de Padrão Existente:** {{link ou descrição do padrão a seguir}}
- **Restrições Chave:** {{quaisquer limitações ou requisitos importantes}}

#### Definição de Pronto

- [ ] Requisitos funcionais atendidos
- [ ] Requisitos de integração verificados
- [ ] Funcionalidade existente testada para regressão
- [ ] Código segue padrões e normas existentes
- [ ] Testes passam (existentes e novos)
- [ ] Documentação atualizada se aplicável

### 3. Verificação de Risco e Compatibilidade

**Avaliação Mínima de Risco:**

- **Risco Primário:** {{risco principal para o sistema existente}}
- **Mitigação:** {{abordagem simples de mitigação}}
- **Rollback:** {{como desfazer se necessário}}

**Verificação de Compatibilidade:**

- [ ] Nenhuma mudança quebra APIs existentes
- [ ] Mudanças no banco de dados (se houver) são apenas aditivas
- [ ] Mudanças na UI seguem padrões de design existentes
- [ ] Impacto na performance é negligível

### 4. Lista de Verificação de Validação

Antes de finalizar a história, confirme:

**Validação de Escopo:**

- [ ] História pode ser concluída em uma sessão de desenvolvimento
- [ ] Abordagem de integração é direta
- [ ] Segue padrões existentes exatamente
- [ ] Nenhum trabalho de design ou arquitetura requerido

**Verificação de Clareza:**

- [ ] Requisitos da história são inequívocos
- [ ] Pontos de integração são claramente especificados
- [ ] Critérios de sucesso são testáveis
- [ ] Abordagem de rollback é simples

## Critérios de Sucesso

A criação da história é bem-sucedida quando:

1. Melhoria é claramente definida e apropriadamente dimensionada para sessão única
2. Abordagem de integração é direta e de baixo risco
3. Padrões do sistema existente são identificados e serão seguidos
4. Plano de rollback é simples e viável
5. Critérios de aceitação incluem verificação da funcionalidade existente

## Notas Importantes

- Esta tarefa é APENAS para mudanças muito pequenas em sistemas legados
- Se a complexidade crescer durante a análise, escale para criar-epico-sistema-legado
- Sempre priorize a integridade do sistema existente
- Em caso de dúvida sobre complexidade de integração, use criar-epico-sistema-legado em vez desta
- Histórias devem levar não mais que 4 horas de trabalho de desenvolvimento focado