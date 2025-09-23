<!-- Desenvolvido por BMAD™ Core -->

# Criar Documento a partir de Template (Orientado por YAML)

## ⚠️ AVISO CRÍTICO DE EXECUÇÃO ⚠️

**ESTE É UM WORKFLOW EXECUTÁVEL - NÃO MATERIAL DE REFERÊNCIA**

Quando esta tarefa for invocada:

1. **DESABILITE TODAS AS OTIMIZAÇÕES DE EFICIÊNCIA** - Este workflow requer interação completa do usuário
2. **EXECUÇÃO PASSO A PASSO OBRIGATÓRIA** - Cada seção deve ser processada sequencialmente com feedback do usuário
3. **ELICITAÇÃO É OBRIGATÓRIA** - Quando `elicit: true`, você DEVE usar o formato 1-9 e aguardar resposta do usuário
4. **NENHUM ATALHO PERMITIDO** - Documentos completos não podem ser criados sem seguir este workflow

**INDICADOR DE VIOLAÇÃO:** Se você criar um documento completo sem interação do usuário, você violou este workflow.

## Crítico: Descoberta de Template

Se um Template YAML não foi fornecido, liste todos os templates de .bmad-core/templates ou peça ao usuário para fornecer outro.

## CRÍTICO: Formato Obrigatório de Elicitação

**Quando `elicit: true`, esta é uma PARADA OBRIGATÓRIA requerendo interação do usuário:**

**VOCÊ DEVE:**

1. Apresentar conteúdo da seção
2. Fornecer justificativa detalhada (explicar trade-offs, suposições, decisões tomadas)
3. **PARAR e apresentar opções numeradas 1-9:**
   - **Opção 1:** Sempre "Prosseguir para próxima seção"
   - **Opções 2-9:** Selecionar 8 métodos de data/elicitation-methods
   - Terminar com: "Selecione 1-9 ou apenas digite sua pergunta/feedback:"
4. **AGUARDAR RESPOSTA DO USUÁRIO** - Não prossiga até que o usuário selecione opção ou forneça feedback

**VIOLAÇÃO DE WORKFLOW:** Criar conteúdo para seções elicit=true sem interação do usuário viola esta tarefa.

**NUNCA faça perguntas sim/não ou use qualquer outro formato.**

## Fluxo de Processamento

1. **Analisar template YAML** - Carregar metadados do template e seções
2. **Definir preferências** - Mostrar modo atual (Interativo), confirmar arquivo de saída
3. **Processar cada seção:**
   - Pular se condição não atendida
   - Verificar permissões de agente (proprietário/editores) - anotar se seção é restrita a agentes específicos
   - Rascunhar conteúdo usando instrução da seção
   - Apresentar conteúdo + justificativa detalhada
   - **SE elicit: true** → formato de opções 1-9 OBRIGATÓRIO
   - Salvar em arquivo se possível
4. **Continuar até completar**

## Requisitos de Justificativa Detalhada

Ao apresentar conteúdo da seção, SEMPRE inclua justificativa que explique:

- Trade-offs e escolhas feitas (o que foi escolhido sobre alternativas e por quê)
- Principais suposições feitas durante o rascunho
- Decisões interessantes ou questionáveis que precisam de atenção do usuário
- Áreas que podem precisar de validação

## Fluxo de Resultados de Elicitação

Depois que o usuário seleciona método de elicitação (2-9):

1. Executar método de data/elicitation-methods
2. Apresentar resultados com insights
3. Oferecer opções:
   - **1. Aplicar mudanças e atualizar seção**
   - **2. Retornar ao menu de elicitação**
   - **3. Fazer perguntas ou continuar com esta elicitação**

## Permissões de Agente

Ao processar seções com campos de permissão de agente:

- **owner**: Anotar qual papel de agente inicialmente cria/popula a seção
- **editors**: Listar papéis de agente autorizados a modificar a seção
- **readonly**: Marcar seções que não podem ser modificadas após criação

**Para seções com acesso restrito:**

- Incluir uma nota no documento gerado indicando o agente responsável
- Exemplo: "_(Esta seção é de propriedade do dev-agent e só pode ser modificada pelo dev-agent)_"

## Modo YOLO

Usuário pode digitar `#yolo` para alternar para modo YOLO (processar todas as seções de uma vez).

## LEMBRETES CRÍTICOS

**❌ NUNCA:**

- Faça perguntas sim/não para elicitação
- Use qualquer formato que não seja opções numeradas 1-9
- Crie novos métodos de elicitação

**✅ SEMPRE:**

- Use formato exato 1-9 quando elicit: true
- Selecione opções 2-9 apenas de data/elicitation-methods
- Forneça justificativa detalhada explicando decisões
- Termine com "Selecione 1-9 ou apenas digite sua pergunta/feedback:"