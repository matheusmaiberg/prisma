<!-- Desenvolvido por PRISMA™ Core -->

# Tarefa de Criar Prompt AI Frontend

## Propósito

Gerar um prompt magistral, abrangente e otimizado que possa ser usado com qualquer ferramenta de desenvolvimento frontend orientada por IA (ex: Vercel v0, Lovable.ai, ou similar) para estruturar ou gerar partes significativas de uma aplicação frontend.

## Entradas

- Especificação UI/UX Completa (`front-end-spec.md`)
- Documento de Arquitetura Frontend Completo (`front-end-architecture`) ou uma arquitetura combinada full stack como `architecture.md`
- Documento Principal de Arquitetura do Sistema (`architecture` - para contratos de API e stack tecnológico para dar mais contexto)

## Atividades Chave & Instruções

### 1. Princípios Fundamentais de Prompting

Antes de gerar o prompt, você deve entender estes princípios fundamentais para interagir com uma IA generativa para código.

- **Seja Explícito e Detalhado**: A IA não pode ler sua mente. Forneça o máximo de detalhes e contexto possível. Solicitações vagas levam a resultados genéricos ou incorretos.
- **Itere, Não Espere Perfeição**: Gerar uma aplicação complexa inteira de uma vez é raro. O método mais eficaz é solicitar um componente ou uma seção por vez, então construir sobre os resultados.
- **Forneça Contexto Primeiro**: Sempre comece fornecendo à IA o contexto necessário, como o stack tecnológico, snippets de código existentes e objetivos gerais do projeto.
- **Abordagem Mobile-First**: Estruture todas as solicitações de geração de UI com uma mentalidade de design mobile-first. Descreva primeiro o layout mobile, então forneça instruções separadas de como deve se adaptar para tablet e desktop.

### 2. O Framework de Prompting Estruturado

Para garantir a saída de mais alta qualidade, você DEVE estruturar cada prompt usando o seguinte framework de quatro partes.

1. **Objetivo de Alto Nível**: Comece com um resumo claro e conciso do objetivo geral. Isso orienta a IA na tarefa principal.
   - _Exemplo: "Criar um formulário responsivo de registro de usuário com validação client-side e integração com API."_
2. **Instruções Detalhadas, Passo-a-Passo**: Forneça uma lista granular e numerada de ações que a IA deve tomar. Quebre tarefas complexas em passos menores e sequenciais. Esta é a parte mais crítica do prompt.
   - _Exemplo: "1. Criar um novo arquivo chamado `RegistrationForm.js`. 2. Usar React hooks para gerenciamento de estado. 3. Adicionar campos de input estilizados para 'Nome', 'Email' e 'Senha'. 4. Para o campo email, garantir que seja um formato de email válido. 5. No envio, chamar o endpoint da API definido abaixo."_
3. **Exemplos de Código, Estruturas de Dados & Restrições**: Incluir quaisquer snippets relevantes de código existente, estruturas de dados ou contratos de API. Isso dá à IA exemplos concretos para trabalhar. Crucialmente, você também deve declarar o que _não_ fazer.
   - _Exemplo: "Use este endpoint da API: `POST /api/register`. O payload JSON esperado é `{ "name": "string", "email": "string", "password": "string" }`. NÃO inclua um campo 'confirmar senha'. Use Tailwind CSS para todo styling."_
4. **Definir Escopo Estrito**: Defina explicitamente os limites da tarefa. Diga à IA quais arquivos ela pode modificar e, mais importante, quais arquivos deixar intocados para prevenir mudanças não intencionais através da base de código.
   - _Exemplo: "Você deve apenas criar o componente `RegistrationForm.js` e adicioná-lo ao arquivo `pages/register.js`. NÃO altere o componente `Navbar.js` ou qualquer outra página ou componente existente."_

### 3. Montando o Prompt Master

Você agora sintetizará as entradas e os princípios acima em um prompt final e abrangente.

1. **Reunir Contexto Fundamental**:
   - Comece o prompt com um preâmbulo descrevendo o propósito geral do projeto, o stack tecnológico completo (ex: Next.js, TypeScript, Tailwind CSS) e a biblioteca principal de componentes UI sendo usada.
2. **Descrever os Visuais**:
   - Se o usuário tiver arquivos de design (Figma, etc.), instrua-o a fornecer links ou capturas de tela.
   - Caso contrário, descreva o estilo visual: paleta de cores, tipografia, espaçamento e estética geral (ex: "minimalista", "corporativo", "divertido").
3. **Construir o Prompt usando o Framework Estruturado**:
   - Siga o framework de quatro partes da Seção 2 para construir a solicitação principal, seja para um único componente ou uma página completa.
4. **Apresentar e Refinar**:
   - Produza o prompt completo e gerado em um formato claro e copiável (ex: um grande bloco de código).
   - Explique a estrutura do prompt e por que certas informações foram incluídas, referenciando os princípios acima.
   - <nota_importante>Conclua lembrando o usuário que todo código gerado por IA exigirá revisão humana cuidadosa, testes e refinamento para ser considerado pronto para produção.</nota_importante>