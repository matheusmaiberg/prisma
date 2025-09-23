<!-- Powered by PRISMA™ Core -->

# Tarefa Indexar Documentação

## Propósito

Esta tarefa mantém a integridade e completude do arquivo `docs/index.md` escaneando todos os arquivos de documentação e garantindo que sejam adequadamente indexados com descrições. Ela lida tanto com documentos de nível raiz quanto com documentos dentro de subpastas, organizando-os hierarquicamente.

## Instruções da Tarefa

Agora você está operando como um Indexador de Documentação. Seu objetivo é garantir que todos os arquivos de documentação sejam adequadamente catalogados no índice central com organização apropriada para subpastas.

### Passos Obrigatórios

1. Primeiro, localize e escaneie:
   - O diretório `docs/` e todos os subdiretórios
   - O arquivo existente `docs/index.md` (crie se ausente)
   - Todos os arquivos markdown (`.md`) e texto (`.txt`) na estrutura de documentação
   - Note a estrutura de pastas para organização hierárquica

2. Para o `docs/index.md` existente:
   - Parse entradas atuais
   - Note referências de arquivo existentes e descrições
   - Identifique quaisquer links quebrados ou arquivos faltantes
   - Mantenha controle do conteúdo já indexado
   - Preserve seções de pasta existentes

3. Para cada arquivo de documentação encontrado:
   - Extraia o título (do primeiro cabeçalho ou nome do arquivo)
   - Gere uma breve descrição analisando o conteúdo
   - Crie um link markdown relativo para o arquivo
   - Verifique se já está no índice
   - Note a qual pasta pertence (se em uma subpasta)
   - Se faltante ou desatualizado, prepare uma atualização

4. Para quaisquer arquivos faltantes ou inexistentes encontrados no índice:
   - Apresente uma lista de todas as entradas que referenciam arquivos inexistentes
   - Para cada entrada:
     - Mostre os detalhes completos da entrada (título, caminho, descrição)
     - Peça confirmação explícita antes da remoção
     - Forneça opção para atualizar o caminho se o arquivo foi movido
     - Registre a decisão (remover/atualizar/manter) para relatório final

5. Atualize `docs/index.md`:
   - Mantenha estrutura e organização existentes
   - Crie seções nível 2 (`##`) para cada subpasta
   - Liste documentos de nível raiz primeiro
   - Adicione entradas faltantes com descrições
   - Atualize entradas desatualizadas
   - Remova apenas entradas que foram confirmadas para remoção
   - Garanta formatação consistente em todo o documento

### Formato da Estrutura do Índice

O índice deve ser organizado da seguinte forma:

```markdown
# Índice de Documentação

## Documentos Raiz

### [Título do Documento](./documento.md)

Breve descrição do propósito e conteúdo do documento.

### [Outro Documento](./outro.md)

Descrição aqui.

## Nome da Pasta

Documentos dentro do diretório `nome-pasta/`:

### [Documento na Pasta](./nome-pasta/documento.md)

Descrição deste documento.

### [Outro na Pasta](./nome-pasta/outro.md)

Descrição aqui.

## Outra Pasta

Documentos dentro do diretório `outra-pasta/`:

### [Documento Aninhado](./outra-pasta/documento.md)

Descrição do documento aninhado.
```

### Formato da Entrada do Índice

Cada entrada deve seguir este formato:

```markdown
### [Título do Documento](caminho/relativo/para/arquivo.md)

Breve descrição do propósito e conteúdo do documento.
```

### Regras de Operação

1. NUNCA modifique o conteúdo dos arquivos indexados
2. Preserve descrições existentes no index.md quando forem adequadas
3. Mantenha qualquer categorização ou agrupamento existente no índice
4. Use caminhos relativos para todos os links (começando com `./`)
5. Garanta que as descrições sejam concisas mas informativas
6. NUNCA remova entradas sem confirmação explícita
7. Reporte quaisquer links quebrados ou inconsistências encontradas
8. Permita atualizações de caminho para arquivos movidos antes de considerar remoção
9. Crie seções de pasta usando cabeçalhos nível 2 (`##`)
10. Ordene pastas alfabeticamente, com documentos raiz listados primeiro
11. Dentro de cada seção, ordene documentos alfabeticamente por título

### Saída do Processo

A tarefa fornecerá:

1. Um resumo das mudanças feitas no index.md
2. Lista de arquivos recém-indexados (organizados por pasta)
3. Lista de entradas atualizadas
4. Lista de entradas apresentadas para remoção e seu status:
   - Remoções confirmadas
   - Caminhos atualizados
   - Mantidos apesar do arquivo faltante
5. Quaisquer novas pastas descobertas
6. Quaisquer outros problemas ou inconsistências encontradas

### Lidando com Arquivos Faltantes

Para cada arquivo referenciado no índice mas não encontrado no sistema de arquivos:

1. Apresente a entrada:

   ```markdown
   Arquivo faltante detectado:
   Título: [Título do Documento]
   Caminho: caminho/relativo/para/arquivo.md
   Descrição: Descrição existente
   Seção: [Documentos Raiz | Nome da Pasta]

   Opções:

   1. Remover esta entrada
   2. Atualizar o caminho do arquivo
   3. Manter entrada (marcar como temporariamente indisponível)

   Por favor escolha uma opção (1/2/3):
   ```

2. Aguarde confirmação do usuário antes de tomar qualquer ação
3. Registre a decisão para o relatório final

### Casos Especiais

1. **Documentos Fragmentados**: Se uma pasta contém um arquivo `index.md`, trate-o como um documento fragmentado:
   - Use o título do `index.md` da pasta como título da seção
   - Liste os documentos da pasta como subseções
   - Note na descrição que este é um documento multi-parte

2. **Arquivos README**: Converta `README.md` para títulos mais descritivos baseados no conteúdo

3. **Subpastas Aninhadas**: Para pastas profundamente aninhadas, mantenha a hierarquia mas limite a 2 níveis no índice principal. Estruturas mais profundas devem ter seus próprios arquivos de índice.

## Entrada Obrigatória

Por favor forneça:

1. Localização do diretório `docs/` (padrão: `./docs`)
2. Confirmação de acesso de escrita ao `docs/index.md`
3. Quaisquer preferências específicas de categorização
4. Quaisquer arquivos ou diretórios para excluir da indexação (ex.: `.git`, `node_modules`)
5. Se incluir arquivos/pastas ocultos (começando com `.`)

Gostaria de prosseguir com a indexação da documentação? Por favor forneça a entrada obrigatória acima.