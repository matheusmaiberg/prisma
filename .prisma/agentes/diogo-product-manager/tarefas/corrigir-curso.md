<!-- Powered by PRISMA™ Core -->

# Tarefa Corrigir Curso

## Propósito

- Guiar uma resposta estruturada a um gatilho de mudança usando o `.prisma-core/checklists/change-checklist`.
- Analisar os impactos da mudança nos épicos, artefatos do projeto e o MVP, guiado pela estrutura do checklist.
- Explorar soluções potenciais (ex.: ajustar escopo, reverter elementos, reescopar funcionalidades) conforme orientado pelo checklist.
- Rascunhar atualizações específicas e acionáveis propostas para quaisquer artefatos de projeto afetados (ex.: épicos, histórias de usuário, seções de PRD, seções de documento de arquitetura) baseado na análise.
- Produzir um documento consolidado "Proposta de Mudança de Sprint" que contém a análise de impacto e as edições propostas claramente rascunhadas para revisão e aprovação do usuário.
- Garantir um caminho claro de handoff se a natureza das mudanças necessita replanejamento fundamental por outros agentes centrais (como PM ou Arquiteto).

## Instruções

### 1. Configuração Inicial & Seleção de Modo

- **Reconhecer Tarefa & Entradas:**
  - Confirme com o usuário que a "Tarefa Corrigir Curso" (Navegação & Integração de Mudanças) está sendo iniciada.
  - Verifique o gatilho de mudança e garanta que você tem a explicação inicial do usuário sobre o problema e seu impacto percebido.
  - Confirme acesso a todos os artefatos de projeto relevantes (ex.: PRD, Épicos/Histórias, Documentos de Arquitetura, Especificações UI/UX) e, criticamente, o `.prisma-core/checklists/change-checklist`.
- **Estabelecer Modo de Interação:**
  - Pergunte ao usuário seu modo de interação preferido para esta tarefa:
    - **"Incrementalmente (Padrão & Recomendado):** Devemos trabalhar através do change-checklist seção por seção, discutindo descobertas e colaborativamente rascunhando mudanças propostas para cada parte relevante antes de passar para a próxima? Isso permite refinamento detalhado, passo a passo."
    - **"Modo YOLO (Processamento em Lote):** Ou, você prefere que eu conduza uma análise mais em lote baseada no checklist e então apresente um conjunto consolidado de descobertas e mudanças propostas para uma revisão mais ampla? Isso pode ser mais rápido para avaliação inicial mas pode requerer revisão mais extensa das propostas combinadas."
  - Uma vez que o usuário escolha, confirme o modo selecionado e então informe o usuário: "Agora usaremos o change-checklist para analisar a mudança e rascunhar atualizações propostas. Vou guiá-lo através dos itens do checklist baseado no nosso modo de interação escolhido."

### 2. Executar Análise do Checklist (Iterativamente ou em Lote, conforme Modo de Interação)

- Trabalhe sistematicamente através das Seções 1-4 do change-checklist (tipicamente cobrindo Contexto de Mudança, Análise de Impacto de Épico/História, Resolução de Conflito de Artefatos, e Avaliação/Recomendação de Caminho).
- Para cada item do checklist ou grupo lógico de itens (dependendo do modo de interação):
  - Apresente o(s) prompt(s) relevante(s) ou considerações do checklist ao usuário.
  - Solicite informações necessárias e analise ativamente os artefatos de projeto relevantes (PRD, épicos, documentos de arquitetura, histórico de histórias, etc.) para avaliar o impacto.
  - Discuta suas descobertas para cada item com o usuário.
  - Registre o status de cada item do checklist (ex.: `[x] Abordado`, `[N/A]`, `[!] Ação Adicional Necessária`) e quaisquer notas ou decisões pertinentes.
  - Colaborativamente concordem no "Caminho Recomendado Adiante" conforme orientado pela Seção 4 do checklist.

### 3. Rascunhar Mudanças Propostas (Iterativamente ou em Lote)

- Baseado na análise completa do checklist (Seções 1-4) e no "Caminho Recomendado Adiante" acordado (excluindo cenários requerendo replanos fundamentais que necessitariam handoff imediato para PM/Arquiteto):
  - Identifique os artefatos de projeto específicos que requerem atualizações (ex.: épicos específicos, histórias de usuário, seções de PRD, componentes de documento de arquitetura, diagramas).
  - **Rascunhe as mudanças propostas diretamente e explicitamente para cada artefato identificado.** Exemplos incluem:
    - Revisar texto de história de usuário, critérios de aceitação ou prioridade.
    - Adicionar, remover, reordenar ou dividir histórias de usuário dentro de épicos.
    - Propor trechos modificados de diagrama de arquitetura (ex.: fornecendo um bloco de diagrama Mermaid atualizado ou uma descrição textual clara da mudança para um diagrama existente).
    - Atualizar listas de tecnologia, detalhes de configuração ou seções específicas dentro do PRD ou documentos de arquitetura.
    - Rascunhar novos artefatos de apoio pequenos se necessário (ex.: um breve adendo para uma decisão específica).
  - Se em "Modo Incremental," discuta e refine essas edições propostas para cada artefato ou pequeno grupo de artefatos relacionados com o usuário conforme são rascunhados.
  - Se em "Modo YOLO," compile todas as edições rascunhadas para apresentação no próximo passo.

### 4. Gerar "Proposta de Mudança de Sprint" com Edições

- Sintetize a análise completa do change-checklist (cobrindo descobertas das Seções 1-4) e todas as edições propostas acordadas (da Instrução 3) em um único documento intitulado "Proposta de Mudança de Sprint." Esta proposta deve se alinhar com a estrutura sugerida pela Seção 5 do change-checklist.
- A proposta deve apresentar claramente:
  - **Resumo da Análise:** Uma visão geral concisa do problema original, seu impacto analisado (nos épicos, artefatos, escopo do MVP), e a racionalização para o caminho escolhido adiante.
  - **Edições Propostas Específicas:** Para cada artefato afetado, mostre claramente ou descreva as mudanças exatas (ex.: "Mudar História X.Y de: [texto antigo] Para: [novo texto]", "Adicionar novo Critério de Aceitação à História A.B: [novo AC]", "Atualizar Seção 3.2 do Documento de Arquitetura como segue: [novo/modificado texto ou descrição de diagrama]").
- Apresente o rascunho completo da "Proposta de Mudança de Sprint" ao usuário para revisão final e feedback. Incorpore quaisquer ajustes finais solicitados pelo usuário.

### 5. Finalizar & Determinar Próximos Passos

- Obtenha aprovação explícita do usuário para a "Proposta de Mudança de Sprint," incluindo todas as edições específicas documentadas dentro dela.
- Forneça o documento finalizado "Proposta de Mudança de Sprint" ao usuário.
- **Baseado na natureza das mudanças aprovadas:**
  - **Se as edições aprovadas abordam suficientemente a mudança e podem ser implementadas diretamente ou organizadas por um PO/SM:** Declare que a "Tarefa Corrigir Curso" está completa em relação à análise e proposta de mudança, e o usuário pode agora prosseguir com implementar ou registrar essas mudanças (ex.: atualizar documentos de projeto reais, itens de backlog). Sugira handoff para um agente PO/SM para organização de backlog se apropriado.
  - **Se a análise e caminho proposto (conforme checklist Seção 4 e potencialmente Seção 6) indicam que a mudança requer um replano mais fundamental (ex.: mudança significativa de escopo, retrabalho arquitetural maior):** Declare claramente esta conclusão. Aconselhe o usuário que o próximo passo envolve engajar os agentes primários PM ou Arquiteto, usando a "Proposta de Mudança de Sprint" como entrada crítica e contexto para esse esforço de replanejamento mais profundo.

## Entregas de Saída

- **Primário:** Um documento "Proposta de Mudança de Sprint" (em formato markdown). Este documento conterá:
  - Um resumo da análise do change-checklist (problema, impacto, racionalização para o caminho escolhido).
  - Edições propostas específicas, claramente rascunhadas para todos os artefatos de projeto afetados.
- **Implícito:** Um change-checklist anotado (ou o registro de sua conclusão) refletindo as discussões, descobertas e decisões feitas durante o processo.