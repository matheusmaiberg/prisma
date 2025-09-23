# 📝 Checklist de Validação de Rascunho de História

**Sistema PRISMA** | **Bob - Scrum Master**

---

O Bob (Scrum Master) deve usar este checklist para validar que cada história contém contexto suficiente para que o James (Developer) possa implementá-la com sucesso, assumindo que o dev tem capacidades razoáveis para descobrir as coisas.

## 🎯 1. CLAREZA DE OBJETIVO E CONTEXTO

**Colaboração com Sarah (PO) e Diogo (PM)**

- [ ] 📋 Objetivo/propósito da história está claramente declarado
- [ ] 🎯 Relacionamento com objetivos do épico é evidente
- [ ] 🔄 Como a história se encaixa no fluxo geral do sistema está explicado
- [ ] 🔗 Dependências de histórias anteriores são identificadas (se aplicável)
- [ ] 💰 Contexto de negócio e valor são claros

**Validação:**
- A história responde: "O QUE construir?"
- O valor de negócio está claro
- Como isso se encaixa no produto maior está explicado
- Dependências são explícitas
- Sucesso é algo específico, não vago

## 🛠️ 2. ORIENTAÇÃO DE IMPLEMENTAÇÃO TÉCNICA

**Preparação para James (Developer)**

- [ ] 📂 Arquivos-chave para criar/modificar são identificados (não necessariamente exaustivo)
- [ ] ⚙️ Tecnologias especificamente necessárias para esta história são mencionadas
- [ ] 🔌 APIs ou interfaces críticas são suficientemente descritas
- [ ] 📊 Modelos de dados ou estruturas necessárias são referenciados
- [ ] 🌍 Variáveis de ambiente necessárias são listadas (se aplicável)
- [ ] ⚠️ Qualquer exceção aos padrões de codificação é anotada

**Validação:**
- Componentes principais a serem criados/modificados estão mencionados
- Escolhas tecnológicas são especificadas onde não óbvias
- Pontos de integração com código existente são identificados
- Contratos de dados ou API são definidos ou referenciados
- Padrões não-padrão ou exceções são destacados

## 📚 3. EFETIVIDADE DE REFERÊNCIAS

**Suporte à Pesquisa do James**

- [ ] 🎯 Referências a documentos externos apontam para seções específicas relevantes
- [ ] 📄 Informações críticas de histórias anteriores são sumarizadas (não apenas referenciadas)
- [ ] 💡 Contexto é fornecido para por que as referências são relevantes
- [ ] 🔗 Referências usam formato consistente (ex: `docs/arquivo.md#secao`)

**Validação:**
- Referências ajudam, não criam uma caça ao tesouro
- Informações críticas são sumarizadas na história
- Relevância de cada referência é explicada
- Referências são acessíveis (não links quebrados)

## 🎯 4. AVALIAÇÃO DE AUTO-CONTENÇÃO

**Redução de Context Switching para James**

- [ ] 📋 Informações centrais necessárias estão incluídas (não excessivamente dependente de docs externos)
- [ ] 💭 Suposições implícitas são tornadas explícitas
- [ ] 📖 Termos ou conceitos específicos do domínio são explicados
- [ ] ⚠️ Casos extremos ou cenários de erro são abordados

**Validação:**
- Requisitos centrais estão na história, não apenas em referências
- Termos de domínio são explicados ou óbvios pelo contexto
- Suposições são declaradas explicitamente
- A história poderia ser entendida sem ler 10 outros documentos

## 🧪 5. ORIENTAÇÃO DE TESTES

**Coordenação com Quinn (Test Architect)**

- [ ] 🧪 Abordagem de teste necessária está delineada
- [ ] 📝 Cenários-chave de teste são identificados
- [ ] ✅ Critérios de sucesso são definidos
- [ ] 🔍 Considerações especiais de teste são anotadas (se aplicável)

**Validação:**
- Abordagem de teste é especificada (unit, integration, e2e)
- Cenários-chave de teste são listados
- Critérios de sucesso são mensuráveis
- Considerações especiais de teste são anotadas

## 📊 RESULTADO DA VALIDAÇÃO

| Categoria                              | Status  | Problemas |
| -------------------------------------- | ------- | --------- |
| 1. Clareza de Objetivo e Contexto      | _TBD_   |           |
| 2. Orientação de Implementação Técnica | _TBD_   |           |
| 3. Efetividade de Referências          | _TBD_   |           |
| 4. Avaliação de Auto-Contenção         | _TBD_   |           |
| 5. Orientação de Testes                | _TBD_   |           |

## 🎯 Avaliação Final

**Status da História:**
- ✅ **PRONTA**: A história fornece contexto suficiente para implementação
- ⚠️ **PRECISA REVISÃO**: A história requer atualizações (ver problemas)
- 🚫 **BLOQUEADA**: Informações externas necessárias (especificar quais)

## 🤝 Colaboração PRISMA

### 👥 Stakeholders Envolvidos:
- **Sarah (Product Owner)**: Definição de requisitos e valor de negócio
- **Diogo (Product Manager)**: Contexto estratégico e priorização
- **James (Developer)**: Implementação e feedback técnico
- **Quinn (Test Architect)**: Estratégia de testes e qualidade

### 📋 Próximos Passos:
1. Se PRONTA ➡️ Enviar para James (Developer)
2. Se PRECISA REVISÃO ➡️ Retornar para Sarah/Diogo com problemas específicos
3. Se BLOQUEADA ➡️ Escalar para resolução de dependências

---

**🔄 Processo Ágil Brasileiro - Bob Scrum Master**
*Focando na qualidade e clareza para maximizar a eficácia da sprint*