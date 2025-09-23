# 🎯 Checklist de Aprovação de Mudanças - Alan (Diretor)

**Propósito:** Guiar sistematicamente o processo de aprovação e coordenação estratégica de mudanças significativas identificadas durante o fluxo PRISMA.

**Instruções:** Revise cada item. Marque `[x]` para completado/confirmado, `[N/A]` se não aplicável, ou adicione notas para pontos de discussão.

---

## 1. 📋 Análise Estratégica do Contexto

- [ ] **🎯 Identificar História Disparadora:** Identificar claramente a história (ou histórias) que revelou a questão.
- [ ] **🔍 Definir o Problema:** Articular o problema central com precisão estratégica.
  - [ ] É uma limitação técnica/caminho sem saída?
  - [ ] É um requisito recém-descoberto?
  - [ ] É um mal-entendido fundamental dos requisitos existentes?
  - [ ] É um pivot necessário baseado em feedback ou nova informação?
  - [ ] É uma história falhada/abandonada que precisa de nova abordagem?
- [ ] **⚡ Avaliar Impacto Inicial:** Descrever as consequências imediatas observadas (progresso bloqueado, funcionalidade incorreta, tecnologia inviável).
- [ ] **📊 Coletar Evidências:** Anotar logs específicos, mensagens de erro, feedback do usuário ou análise que suporte a definição do problema.

## 2. 🎭 Avaliação de Impacto nos Épicos

- [ ] **🔄 Analisar Épico Atual:**
  - [ ] O épico atual contendo a história disparadora ainda pode ser completado?
  - [ ] O épico atual precisa de modificação (mudanças, adições, remoções de histórias)?
  - [ ] O épico atual deve ser abandonado ou fundamentalmente redefinido?
- [ ] **🚀 Analisar Épicos Futuros:**
  - [ ] Revisar todos os épicos planejados restantes.
  - [ ] O problema requer mudanças nas histórias planejadas em épicos futuros?
  - [ ] O problema invalida algum épico futuro?
  - [ ] O problema necessita a criação de épicos inteiramente novos?
  - [ ] A ordem/prioridade dos épicos futuros deve ser alterada?
- [ ] **📝 Resumir Impacto nos Épicos:** Documentar brevemente o efeito geral na estrutura e fluxo dos épicos do projeto.

## 3. 🏛️ Análise de Conflitos e Impacto nos Artefatos

- [ ] **📋 Revisar PRD:**
  - [ ] O problema conflita com os objetivos centrais ou requisitos declarados no PRD?
  - [ ] O PRD precisa de esclarecimentos ou atualizações baseadas no novo entendimento?
- [ ] **🏗️ Revisar Documento de Arquitetura:**
  - [ ] O problema conflita com a arquitetura documentada (componentes, padrões, escolhas tecnológicas)?
  - [ ] Componentes/diagramas/seções específicos são impactados?
  - [ ] A lista de tecnologias precisa de atualização?
  - [ ] Modelos de dados ou esquemas precisam de revisão?
  - [ ] Integrações de APIs externas são afetadas?
- [ ] **🎨 Revisar Especificação Frontend (se aplicável):**
  - [ ] O problema conflita com a arquitetura FE, escolha da biblioteca de componentes ou design UI/UX?
  - [ ] Componentes FE específicos ou fluxos de usuário são impactados?
- [ ] **📚 Resumir Impacto nos Artefatos:** Listar todos os artefatos que requerem atualizações e a natureza das mudanças necessárias.

## 4. 🛤️ Avaliação do Caminho a Seguir

- [ ] **🔧 Opção 1: Ajuste Direto / Integração:**
  - [ ] O problema pode ser abordado modificando/adicionando histórias futuras dentro do plano existente?
  - [ ] Definir o escopo e natureza desses ajustes.
  - [ ] Avaliar viabilidade, esforço e riscos deste caminho.
- [ ] **🔄 Opção 2: Rollback Potencial:**
  - [ ] Reverter histórias completadas simplificaria significativamente o tratamento do problema?
  - [ ] Identificar histórias/commits específicos para considerar rollback.
  - [ ] Avaliar o esforço necessário para rollback.
  - [ ] Avaliar o impacto do rollback (trabalho perdido, implicações de dados).
  - [ ] Comparar o benefício/custo líquido vs. Ajuste Direto.
- [ ] **📊 Opção 3: Revisão do MVP do PRD & Re-escopo Potencial:**
  - [ ] O MVP original do PRD ainda é alcançável dado o problema e restrições?
  - [ ] O escopo do MVP precisa de redução (removendo recursos/épicos)?
  - [ ] Os objetivos centrais do MVP precisam de modificação?
  - [ ] Abordagens alternativas são necessárias para atender a intenção original do MVP?
  - [ ] **Caso Extremo:** O problema necessita um replanejamento fundamental ou potencialmente um novo PRD V2?
- [ ] **✅ Selecionar Caminho Recomendado:** Baseado na avaliação, concordar com o caminho mais viável.

## 5. 📋 Componentes da Proposta de Mudança

- [ ] **📝 Resumo do Problema Identificado:** Declaração clara e concisa do problema.
- [ ] **🎭 Resumo do Impacto nos Épicos:** Como os épicos são afetados.
- [ ] **📚 Necessidades de Ajuste dos Artefatos:** Lista de documentos a serem alterados.
- [ ] **🛤️ Caminho Recomendado:** Solução escolhida com justificativa.
- [ ] **🎯 Impacto no MVP do PRD:** Mudanças no escopo/objetivos (se houver).
- [ ] **📋 Plano de Ação de Alto Nível:** Próximos passos para histórias/atualizações.
- [ ] **🤝 Plano de Delegação:** Identificar papéis necessários (PM, Arquiteto, Arquiteto de Design, PO).

## 6. 🏁 Revisão Final e Aprovação Executiva

- [ ] **✅ Revisar Checklist:** Confirmar que todos os itens relevantes foram discutidos.
- [ ] **📋 Revisar Proposta de Mudança:** Garantir que ela reflete precisamente a discussão e decisões.
- [ ] **👥 Aprovação Estratégica:** Obter aprovação explícita baseada no impacto estratégico.
- [ ] **🎯 Confirmar Próximos Passos:** Reiterar o plano de delegação e as próximas ações a serem tomadas por agentes específicos.
- [ ] **📊 Definir Métricas de Sucesso:** Como validaremos que a mudança funcionou.
- [ ] **🚨 Plano de Contingência:** Definir plano de rollback se a mudança falhar.

---

## 🎯 Critérios de Aprovação do Diretor

- [ ] **💰 Impacto Orçamentário:** Mudança está dentro do orçamento aprovado ou justifica realocação
- [ ] **⏰ Impacto no Timeline:** Timeline revisado é aceitável para stakeholders
- [ ] **🎯 Alinhamento Estratégico:** Mudança mantém alinhamento com objetivos estratégicos
- [ ] **⚖️ Análise de Risco:** Riscos são aceitáveis e mitigáveis
- [ ] **👥 Impacto na Equipe:** Recursos e capacidades da equipe são adequados
- [ ] **📈 ROI Projetado:** Retorno esperado justifica o investimento adicional

**🎯 Assinatura Digital:** _Alan - Diretor PRISMA_