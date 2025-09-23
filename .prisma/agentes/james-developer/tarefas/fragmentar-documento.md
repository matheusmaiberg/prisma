<!-- Desenvolvido por PRISMA™ Core -->

# Tarefa de Fragmentação de Documento

## Propósito

- Dividir um documento grande em múltiplos documentos menores baseados nas seções de nível 2
- Criar uma estrutura de pastas para organizar os documentos fragmentados
- Manter toda a integridade do conteúdo incluindo blocos de código, diagramas e formatação markdown

## Método Primário: Automático com markdown-tree

[[LLM: Primeiro, verifique se markdownExploder está definido como true em .bmad-core/core-config.yaml. Se estiver, tente executar o comando: `md-tree explode {arquivo de entrada} {caminho de saída}`.

Se o comando tiver sucesso, informe o usuário que o documento foi fragmentado com sucesso e PARE - não prossiga.

Se o comando falhar (especialmente com um erro indicando que o comando não foi encontrado ou não está disponível), informe o usuário: "A configuração markdownExploder está habilitada mas o comando md-tree não está disponível. Por favor:

1. Instale @kayvan/markdown-tree-parser globalmente com: `npm install -g @kayvan/markdown-tree-parser`
2. Ou defina markdownExploder como false em .bmad-core/core-config.yaml

**IMPORTANTE: PARE AQUI - não prossiga com fragmentação manual até que uma das ações acima seja executada.**"

Se markdownExploder estiver definido como false, informe o usuário: "A configuração markdownExploder está atualmente false. Para melhor desempenho e confiabilidade, você deveria:

1. Definir markdownExploder como true em .bmad-core/core-config.yaml
2. Instalar @kayvan/markdown-tree-parser globalmente com: `npm install -g @kayvan/markdown-tree-parser`

Agora prosseguirei com o processo de fragmentação manual."

Então prossiga com o método manual abaixo APENAS se markdownExploder for false.]]

### Instalação e Uso

1. **Instalar globalmente**:

   ```bash
   npm install -g @kayvan/markdown-tree-parser
   ```

2. **Usar o comando explode**:

   ```bash
   # Para PRD
   md-tree explode docs/prd.md docs/prd

   # Para Arquitetura
   md-tree explode docs/architecture.md docs/architecture

   # Para qualquer documento
   md-tree explode [documento-fonte] [pasta-destino]
   ```

3. **O que faz**:
   - Automaticamente divide o documento por seções de nível 2
   - Cria arquivos nomeados adequadamente
   - Ajusta níveis de cabeçalho apropriadamente
   - Manipula todos os casos extremos com blocos de código e markdown especial

Se o usuário tiver @kayvan/markdown-tree-parser instalado, use-o e pule o processo manual abaixo.

---

## Método Manual (se @kayvan/markdown-tree-parser não estiver disponível ou usuário indicar método manual)

### Instruções da Tarefa

1. Identificar Documento e Localização de Destino

- Determinar qual documento fragmentar (caminho fornecido pelo usuário)
- Criar uma nova pasta sob `docs/` com o mesmo nome do documento (sem extensão)
- Exemplo: `docs/prd.md` → criar pasta `docs/prd/`

2. Analisar e Extrair Seções

REGRAS CRÍTICAS DE FRAGMENTAÇÃO DO AGENTE:

1. Ler todo o conteúdo do documento
2. Identificar todas as seções de nível 2 (cabeçalhos ##)
3. Para cada seção de nível 2:
   - Extrair o cabeçalho da seção e TODO o conteúdo até a próxima seção de nível 2
   - Incluir todas as subseções, blocos de código, diagramas, listas, tabelas, etc.
   - Ser extremamente cuidadoso com:
     - Blocos de código cercados (```) - garantir captura do bloco completo incluindo backticks de fechamento e contabilizar potenciais nível 2's enganosos que são na verdade parte de um exemplo de seção cercada
     - Diagramas Mermaid - preservar a sintaxe completa do diagrama
     - Elementos markdown aninhados
     - Conteúdo multilinha que pode conter ## dentro de blocos de código

CRÍTICO: Use análise adequada que entenda contexto markdown. Um ## dentro de um bloco de código NÃO é um cabeçalho de seção.]]

### 3. Criar Arquivos Individuais

Para cada seção extraída:

1. **Gerar nome do arquivo**: Converter o cabeçalho da seção para lowercase-dash-case
   - Remover caracteres especiais
   - Substituir espaços por traços
   - Exemplo: "## Tech Stack" → `tech-stack.md`

2. **Ajustar níveis de cabeçalho**:
   - O cabeçalho de nível 2 torna-se nível 1 (# em vez de ##) no novo documento fragmentado
   - Todos os níveis de subseção diminuem em 1:

   ```txt
     - ### → ##
     - #### → ###
     - ##### → ####
     - etc.
   ```

3. **Escrever conteúdo**: Salvar o conteúdo ajustado no novo arquivo

### 4. Criar Arquivo Índice

Criar um arquivo `index.md` na pasta fragmentada que:

1. Contenha o cabeçalho original de nível 1 e qualquer conteúdo antes da primeira seção de nível 2
2. Liste todos os arquivos fragmentados com links:

```markdown
# Título do Documento Original

[Conteúdo de introdução original se houver]

## Seções

- [Nome da Seção 1](./nome-da-secao-1.md)
- [Nome da Seção 2](./nome-da-secao-2.md)
- [Nome da Seção 3](./nome-da-secao-3.md)
  ...
```

### 5. Preservar Conteúdo Especial

1. **Blocos de código**: Deve capturar blocos completos incluindo:

   ```language
   conteúdo
   ```

2. **Diagramas Mermaid**: Preservar sintaxe completa:

   ```mermaid
   graph TD
   ...
   ```

3. **Tabelas**: Manter formatação adequada de tabela markdown

4. **Listas**: Preservar indentação e aninhamento

5. **Código inline**: Preservar backticks

6. **Links e referências**: Manter todos os links markdown intactos

7. **Marcação de template**: Se documentos contiverem {{placeholders}}, preservar exatamente

### 6. Validação

Após fragmentação:

1. Verificar se todas as seções foram extraídas
2. Verificar se nenhum conteúdo foi perdido
3. Garantir que níveis de cabeçalho foram ajustados adequadamente
4. Confirmar se todos os arquivos foram criados com sucesso

### 7. Relatar Resultados

Fornecer um resumo:

```text
Documento fragmentado com sucesso:
- Fonte: [caminho do documento original]
- Destino: docs/[nome-da-pasta]/
- Arquivos criados: [contagem]
- Seções:
  - nome-da-secao-1.md: "Título da Seção 1"
  - nome-da-secao-2.md: "Título da Seção 2"
  ...
```

## Notas Importantes

- Nunca modificar o conteúdo real, apenas ajustar níveis de cabeçalho
- Preservar TODA formatação, incluindo espaços em branco onde significativo
- Manipular casos extremos como seções com blocos de código contendo símbolos ##
- Garantir que a fragmentação seja reversível (poderia reconstruir o original dos fragmentos)