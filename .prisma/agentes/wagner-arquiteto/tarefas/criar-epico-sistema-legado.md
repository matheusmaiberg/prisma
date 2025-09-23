# Criar Épico para Sistema Legado

## Objetivo

Criar um único épico para melhorias menores em sistemas legados que não requerem o processo completo de PRD e documentação de arquitetura. Esta tarefa é para funcionalidades isoladas ou modificações que podem ser completadas dentro de um escopo focado.

## Quando Usar Esta Tarefa

**Use esta tarefa quando:**

- A melhoria pode ser completada em 1-3 histórias
- Não são necessárias mudanças arquiteturais significativas
- A melhoria segue padrões existentes do projeto
- A complexidade de integração é mínima
- O risco para o sistema existente é baixo

**Use o processo completo de PRD/Arquitetura para brownfield quando:**

- A melhoria requer múltiplas histórias coordenadas
- Planejamento arquitetural é necessário
- Trabalho significativo de integração é requerido
- Avaliação de risco e planejamento de mitigação são necessários

## Instruções

### 1. Análise do Projeto (Obrigatório)

Antes de criar o épico, colete informações essenciais sobre o projeto existente:

**Contexto do Projeto Existente:**

- [ ] Objetivo do projeto e funcionalidade atual compreendidos
- [ ] Stack de tecnologia existente identificado
- [ ] Padrões de arquitetura atuais anotados
- [ ] Pontos de integração com sistema existente identificados

**Escopo da Melhoria:**

- [ ] Melhoria claramente definida e delimitada
- [ ] Impacto na funcionalidade existente avaliado
- [ ] Pontos de integração necessários identificados
- [ ] Critérios de sucesso estabelecidos

### 2. Criação do Épico

Crie um épico focado seguindo esta estrutura:

#### Título do Épico

{{Nome da Melhoria}} - Melhoria em Sistema Legado

#### Objetivo do Épico

{{1-2 frases descrevendo o que o épico irá realizar e por que agrega valor}}

#### Descrição do Épico

**Contexto do Sistema Existente:**

- Funcionalidade relevante atual: {{descrição breve}}
- Stack de tecnologia: {{tecnologias existentes relevantes}}
- Pontos de integração: {{onde o novo trabalho se conecta ao sistema existente}}

**Detalhes da Melhoria:**

- O que está sendo adicionado/alterado: {{descrição clara}}
- Como se integra: {{abordagem de integração}}
- Critérios de sucesso: {{resultados mensuráveis}}

#### Histórias

Liste 1-3 histórias focadas que completam o épico:

1. **História 1:** {{Título da história e descrição breve}}
2. **História 2:** {{Título da história e descrição breve}}
3. **História 3:** {{Título da história e descrição breve}}

#### Requisitos de Compatibilidade

- [ ] APIs existentes permanecem inalteradas
- [ ] Mudanças no schema do banco de dados são retrocompatíveis
- [ ] Mudanças na UI seguem padrões existentes
- [ ] Impacto na performance é mínimo

#### Mitigação de Riscos

- **Risco Principal:** {{principal risco para o sistema existente}}
- **Mitigação:** {{como o risco será endereçado}}
- **Plano de Rollback:** {{como desfazer as mudanças se necessário}}

#### Definição de Pronto

- [ ] Todas as histórias completadas com critérios de aceitação atendidos
- [ ] Funcionalidade existente verificada através de testes
- [ ] Pontos de integração funcionando corretamente
- [ ] Documentação atualizada apropriadamente
- [ ] Nenhuma regressão em funcionalidades existentes

### 3. Lista de Verificação de Validação

Antes de finalizar o épico, assegure:

**Validação de Escopo:**

- [ ] Épico pode ser completado em máximo 1-3 histórias
- [ ] Nenhuma documentação arquitetural é necessária
- [ ] Melhoria segue padrões existentes
- [ ] Complexidade de integração é gerenciável

**Avaliação de Risco:**

- [ ] Risco para sistema existente é baixo
- [ ] Plano de rollback é viável
- [ ] Abordagem de testes cobre funcionalidade existente
- [ ] Equipe tem conhecimento suficiente dos pontos de integração

**Verificação de Completude:**

- [ ] Objetivo do épico é claro e alcançável
- [ ] Histórias estão adequadamente delimitadas
- [ ] Critérios de sucesso são mensuráveis
- [ ] Dependências são identificadas

### 4. Handoff para Gerente de Histórias

Uma vez que o épico for validado, forneça este handoff para o Gerente de Histórias:

---

**Handoff para Gerente de Histórias:**

"Por favor, desenvolva histórias de usuário detalhadas para este épico brownfield. Considerações principais:

- Esta é uma melhoria para um sistema existente executando {{stack de tecnologia}}
- Pontos de integração: {{listar pontos-chave de integração}}
- Padrões existentes a seguir: {{padrões existentes relevantes}}
- Requisitos críticos de compatibilidade: {{requisitos principais}}
- Cada história deve incluir verificação de que a funcionalidade existente permanece intacta

O épico deve manter a integridade do sistema enquanto entrega {{objetivo do épico}}."

---

## Critérios de Sucesso

A criação do épico é bem-sucedida quando:

1. Escopo da melhoria é claramente definido e adequadamente dimensionado
2. Abordagem de integração respeita a arquitetura do sistema existente
3. Risco para funcionalidade existente é minimizado
4. Histórias são logicamente sequenciadas para implementação segura
5. Requisitos de compatibilidade são claramente especificados
6. Plano de rollback é viável e documentado

## Notas Importantes

- Esta tarefa é especificamente para melhorias PEQUENAS em sistemas legados
- Se o escopo crescer além de 3 histórias, considere o processo completo de PRD brownfield
- Sempre priorize a integridade do sistema existente sobre nova funcionalidade
- Quando em dúvida sobre escopo ou complexidade, escale para planejamento brownfield completo