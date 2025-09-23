<!-- Powered by PRISMA™ Core -->

# Tarefa Validação de Checklist

Esta tarefa fornece instruções para validar documentação contra checklists. O agente DEVE seguir estas instruções para garantir validação completa e sistemática de documentos.

## Checklists Disponíveis

Se o usuário perguntar ou não especificar um checklist específico, liste os checklists disponíveis para a persona do agente. Se a tarefa estiver sendo executada não com um agente específico, diga ao usuário para verificar a pasta .prisma-core/checklists para selecionar o apropriado para executar.

## Instruções

1. **Avaliação Inicial**
   - Se usuário ou a tarefa sendo executada fornecer um nome de checklist:
     - Tente correspondência difusa (ex.: "checklist arquitetura" -> "architect-checklist")
     - Se múltiplas correspondências encontradas, peça ao usuário para esclarecer
     - Carregue o checklist apropriado de .prisma-core/checklists/
   - Se nenhum checklist especificado:
     - Pergunte ao usuário qual checklist eles querem usar
     - Apresente as opções disponíveis dos arquivos na pasta checklists
   - Confirme se eles querem trabalhar através do checklist:
     - Seção por seção (modo interativo - muito demorado)
     - Tudo de uma vez (modo YOLO - recomendado para checklists, haverá um resumo de seções no final para discutir)

2. **Coleta de Documentos e Artefatos**
   - Cada checklist especificará seus documentos/artefatos obrigatórios no início
   - Siga as instruções específicas do checklist sobre o que coletar, geralmente um arquivo pode ser resolvido na pasta docs, se não ou incerto, pare e pergunte ou confirme com o usuário.

3. **Processamento do Checklist**

   Se em modo interativo:
   - Trabalhe através de cada seção do checklist uma de cada vez
   - Para cada seção:
     - Revise todos os itens na seção seguindo instruções para aquela seção incorporadas no checklist
     - Verifique cada item contra a documentação ou artefatos relevantes conforme apropriado
     - Apresente resumo das descobertas para aquela seção, destacando avisos, erros e itens não aplicáveis (racionalização para não-aplicabilidade).
     - Obtenha confirmação do usuário antes de prosseguir para próxima seção ou se algo importante, precisamos parar e tomar ação corretiva

   Se em modo YOLO:
   - Processe todas as seções de uma vez
   - Crie um relatório abrangente de todas as descobertas
   - Apresente a análise completa ao usuário

4. **Abordagem de Validação**

   Para cada item do checklist:
   - Leia e entenda o requisito
   - Procure evidência na documentação que satisfaça o requisito
   - Considere tanto menções explícitas quanto cobertura implícita
   - Além disso, siga todas as instruções llm do checklist
   - Marque itens como:
     - ✅ PASSOU: Requisito claramente atendido
     - ❌ FALHOU: Requisito não atendido ou cobertura insuficiente
     - ⚠️ PARCIAL: Alguns aspectos cobertos mas precisa melhoria
     - N/A: Não aplicável a este caso

5. **Análise de Seção**

   Para cada seção:
   - pense passo a passo para calcular taxa de aprovação
   - Identifique temas comuns em itens falhados
   - Forneça recomendações específicas para melhoria
   - Em modo interativo, discuta descobertas com usuário
   - Documente quaisquer decisões ou explicações do usuário

6. **Relatório Final**

   Prepare um resumo que inclua:
   - Status geral de conclusão do checklist
   - Taxas de aprovação por seção
   - Lista de itens falhados com contexto
   - Recomendações específicas para melhoria
   - Quaisquer seções ou itens marcados como N/A com justificativa

## Metodologia de Execução de Checklist

Cada checklist agora contém prompts e instruções LLM incorporados que irão:

1. **Guiar pensamento completo** - Prompts garantem análise profunda de cada seção
2. **Solicitar artefatos específicos** - Instruções claras sobre quais documentos/acesso é necessário
3. **Fornecer orientação contextual** - Prompts específicos de seção para melhor validação
4. **Gerar relatórios abrangentes** - Resumo final com descobertas detalhadas

O LLM irá:

- Executar a validação completa do checklist
- Apresentar um relatório final com taxas de aprovação/reprovação e descobertas chave
- Oferecer para fornecer análise detalhada de qualquer seção, especialmente aquelas com avisos ou falhas