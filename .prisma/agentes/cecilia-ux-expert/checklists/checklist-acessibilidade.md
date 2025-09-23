# ♿ Checklist de Acessibilidade - PRISMA

> **Agente**: Cecília - UX Expert
> **Propósito**: Validação completa de acessibilidade e design inclusivo
> **Padrão**: WCAG 2.1 AA + Boas Práticas
> **Última Atualização**: 2025-09-23

## 🎯 Visão Geral

Este checklist garante que todos os produtos do PRISMA sejam acessíveis e inclusivos, seguindo as diretrizes WCAG 2.1 nível AA e promovendo design universal para todos os usuários.

---

## 📋 Checklist de Acessibilidade Completo

### 👁️ **1. PERCEPTÍVEL - Informação apresentada de forma acessível**

#### 🎨 **1.1 Alternativas em Texto**
- [ ] **Imagens e Ícones**
  - [ ] 🖼️ Todas as imagens informativas possuem alt text descritivo
  - [ ] 🎨 Imagens decorativas possuem alt="" ou role="presentation"
  - [ ] 📊 Gráficos e charts possuem descrições textuais detalhadas
  - [ ] 🔤 Ícones funcionais possuem labels acessíveis
  - [ ] 📷 Captcha possui alternativas em áudio ou outras modalidades

#### 🎬 **1.2 Mídia Temporal**
- [ ] **Vídeo e Áudio**
  - [ ] 📝 Legendas (captions) disponíveis para todos os vídeos
  - [ ] 📜 Transcrições completas para conteúdo de áudio
  - [ ] 👐 Libras ou linguagem de sinais quando aplicável
  - [ ] ⏸️ Controles de play/pause/volume acessíveis
  - [ ] 🔇 Autoplay desabilitado ou facilmente pausável

#### 📱 **1.3 Adaptável**
- [ ] **Estrutura e Layout**
  - [ ] 🏗️ Estrutura semântica adequada (headings H1-H6)
  - [ ] 📋 Ordem de leitura lógica e sequencial
  - [ ] 📱 Layout responsivo funciona em orientações diferentes
  - [ ] 🔍 Zoom até 200% sem quebra de funcionalidade
  - [ ] 📐 Reflow em 320px de largura sem scroll horizontal

#### 🎨 **1.4 Distinguível**
- [ ] **Contraste e Cores**
  - [ ] ⚫ Contraste mínimo 4.5:1 para texto normal
  - [ ] ⚫ Contraste mínimo 3:1 para texto grande (18pt+ ou 14pt+ bold)
  - [ ] 🎨 Contraste mínimo 3:1 para elementos de UI
  - [ ] 🔴 Informação não depende apenas de cor
  - [ ] 🚫 Cores não são única forma de transmitir informação

- [ ] **Áudio e Movimento**
  - [ ] 🔇 Controle de áudio background disponível
  - [ ] ⏸️ Animações podem ser pausadas ou desabilitadas
  - [ ] 🌀 Movimento/piscamento não causa convulsões
  - [ ] 📱 Resposta a movimento do dispositivo é opcional

### ⌨️ **2. OPERÁVEL - Interface utilizável por todos**

#### ⌨️ **2.1 Acessível via Teclado**
- [ ] **Navegação por Teclado**
  - [ ] ⌨️ Toda funcionalidade acessível via teclado
  - [ ] 🔄 Ordem de tab lógica e intuitiva
  - [ ] 👁️ Indicadores de foco visíveis e claros
  - [ ] 🚫 Nenhuma "armadilha" de teclado (keyboard trap)
  - [ ] ⚡ Shortcuts de teclado documentados

- [ ] **Controles Personalizados**
  - [ ] 🎛️ Componentes customizados operam via teclado
  - [ ] 📱 Touch targets têm pelo menos 44x44px
  - [ ] 🎯 Área de clique adequada para targets pequenos
  - [ ] ⌨️ Enter e Space ativam botões apropriadamente
  - [ ] 🔄 Arrow keys navegam em listas e menus

#### ⏰ **2.2 Tempo Suficiente**
- [ ] **Limites de Tempo**
  - [ ] ⏰ Usuário pode desabilitar, ajustar ou estender timeouts
  - [ ] ⚠️ Avisos antes de timeouts são fornecidos
  - [ ] ⏸️ Conteúdo que move/pisca pode ser pausado
  - [ ] 🔄 Auto-refresh pode ser controlado pelo usuário
  - [ ] 💾 Dados são preservados em caso de timeout

#### 🌀 **2.3 Convulsões e Reações Físicas**
- [ ] **Segurança Neurológica**
  - [ ] ⚡ Nenhum flash mais de 3 vezes por segundo
  - [ ] 🌈 Flashes não ultrapassam limites de segurança
  - [ ] 🌀 Movimento vestibular é opcional
  - [ ] 📱 Paralaxe pode ser desabilitado
  - [ ] ⚠️ Avisos para conteúdo potencialmente problemático

#### 🧭 **2.4 Navegável**
- [ ] **Orientação e Navegação**
  - [ ] 🔗 Skip links para conteúdo principal
  - [ ] 📍 Breadcrumbs e indicadores de localização
  - [ ] 🏷️ Títulos de página descritivos e únicos
  - [ ] 🎯 Propósito dos links é claro no contexto
  - [ ] 🗺️ Múltiplas formas de navegação disponíveis

- [ ] **Busca e Descoberta**
  - [ ] 🔍 Função de busca acessível
  - [ ] 📋 Sitemap ou índice disponível
  - [ ] 🏷️ Headings organizam conteúdo hierarquicamente
  - [ ] 🔄 Resultado de busca é anunciado para screen readers
  - [ ] 📍 Posição atual na navegação é indicada

#### 🖱️ **2.5 Modalidades de Entrada**
- [ ] **Gestos e Ponteiros**
  - [ ] 👆 Gestos complexos têm alternativas simples
  - [ ] 📱 Funcionalidade multipoint tem alternativa
  - [ ] 🎯 Ações são ativadas no mouse up, não down
  - [ ] 🔄 Ações acidentais podem ser canceladas/desfeitas
  - [ ] 🏷️ Labels de controles correspondem ao nome acessível

### 🤝 **3. COMPREENSÍVEL - Informação e operação da UI**

#### 📖 **3.1 Legível**
- [ ] **Idioma e Clareza**
  - [ ] 🌍 Idioma da página declarado no HTML
  - [ ] 🔤 Idioma de partes específicas identificado quando diferente
  - [ ] 📚 Texto complexo tem explicações ou glossários
  - [ ] 🎓 Nível de leitura apropriado para audiência
  - [ ] 📝 Abreviações e jargões são explicados

#### 🔮 **3.2 Previsível**
- [ ] **Comportamento Consistente**
  - [ ] 🔄 Componentes iguais funcionam de forma consistente
  - [ ] 🧭 Navegação é consistente entre páginas
  - [ ] ⚠️ Mudanças de contexto são iniciadas pelo usuário
  - [ ] 🔗 Links e botões têm comportamento previsível
  - [ ] 📱 Orientação e layout seguem convenções

- [ ] **Feedback e Estados**
  - [ ] ✅ Estados de sucesso são claramente comunicados
  - [ ] ⚠️ Erros são explicados em linguagem clara
  - [ ] 💡 Dicas de ajuda estão disponíveis quando necessário
  - [ ] 🔄 Mudanças de estado são anunciadas
  - [ ] 📍 Localização atual é sempre clara

#### 🆘 **3.3 Assistência de Entrada**
- [ ] **Prevenção e Correção de Erros**
  - [ ] 🛡️ Erros são identificados e descritos claramente
  - [ ] 💡 Sugestões de correção são fornecidas
  - [ ] 📝 Labels e instruções são claras e específicas
  - [ ] ⚠️ Validação acontece no momento apropriado
  - [ ] 🔄 Confirmação para ações importantes/irreversíveis

- [ ] **Formulários Acessíveis**
  - [ ] 🏷️ Todos os campos têm labels associadas
  - [ ] ⚠️ Campos obrigatórios são claramente marcados
  - [ ] 📝 Instruções estão associadas aos campos corretos
  - [ ] 🔍 Formato esperado é comunicado (ex: data, telefone)
  - [ ] ✅ Autocomplete attributes apropriados quando aplicável

### 🔧 **4. ROBUSTO - Conteúdo interpretável por tecnologias assistivas**

#### 🤖 **4.1 Compatível**
- [ ] **Tecnologias Assistivas**
  - [ ] 🏗️ HTML semântico válido e bem estruturado
  - [ ] 👥 ARIA labels e roles usados apropriadamente
  - [ ] 📢 Screen readers conseguem ler todo conteúdo
  - [ ] 🔄 Estados dinâmicos são anunciados (live regions)
  - [ ] 🧩 Componentes customizados têm semântica adequada

- [ ] **Compatibilidade Cross-Platform**
  - [ ] 💻 Funciona com diferentes browsers e screen readers
  - [ ] 📱 Compatível com tecnologias assistivas móveis
  - [ ] ⌨️ Suporte a diferentes métodos de entrada
  - [ ] 🎙️ Compatível com software de reconhecimento de voz
  - [ ] 👁️ Funciona com magnificadores de tela

---

## 🤝 Colaboração com Outros Agentes

### 👩‍💼 **Sarah (Product Owner)**
- [ ] 📊 Métricas de acessibilidade integradas aos KPIs
- [ ] 🎯 User stories incluem critérios de acessibilidade
- [ ] 👥 Personas com necessidades específicas consideradas
- [ ] 💼 Business case para acessibilidade estabelecido

### 👨‍💼 **Diogo (Product Manager)**
- [ ] 📈 ROI de acessibilidade comunicado
- [ ] 🌍 Considerações legais e de compliance
- [ ] 🎯 Roadmap inclui melhorias de acessibilidade
- [ ] 📊 Benchmarking com concorrentes

### 👨‍💻 **James (Developer)**
- [ ] 🛠️ Implementação de ARIA e semântica HTML
- [ ] 🧪 Testes automatizados de acessibilidade
- [ ] 🔧 Configuração de ferramentas de teste
- [ ] 📚 Training em desenvolvimento acessível

---

## 🛠️ Ferramentas de Validação

### 🔍 **Ferramentas Automatizadas**
- [ ] **Axe DevTools**: Análise automática de acessibilidade
- [ ] **WAVE**: Avaliação visual de problemas
- [ ] **Lighthouse**: Audit de acessibilidade integrado
- [ ] **Pa11y**: Testes de linha de comando
- [ ] **Stark**: Plugin para Figma/Sketch

### 🧪 **Testes Manuais**
- [ ] **Navegação por Teclado**: Tab, Enter, Space, Arrow keys
- [ ] **Screen Reader**: NVDA, JAWS, VoiceOver
- [ ] **Zoom**: 200% sem quebra de funcionalidade
- [ ] **Simulação de Deficiências**: Daltonismo, baixa visão
- [ ] **Dispositivos Móveis**: TalkBack, VoiceOver

---

## 👥 Testes com Usuários

### ♿ **Usuários com Deficiências**
- [ ] 👁️ Testes com usuários cegos ou com baixa visão
- [ ] 🔇 Testes com usuários surdos ou com deficiência auditiva
- [ ] ⌨️ Testes com usuários com limitações motoras
- [ ] 🧠 Testes com usuários com deficiências cognitivas
- [ ] 📊 Feedback coletado e documentado

### 📊 **Métricas de Acessibilidade**
- [ ] **Taxa de Conclusão**: Para usuários com tecnologias assistivas
- [ ] **Tempo na Tarefa**: Comparação com usuários sem deficiência
- [ ] **Taxa de Erro**: Frequência de erros por tipo de deficiência
- [ ] **Satisfação**: Questionários específicos de acessibilidade
- [ ] **Abandono**: Taxa de abandono por barreiras de acessibilidade

---

## 📋 Compliance e Documentação

### 📜 **Documentação de Acessibilidade**
- [ ] 📄 Accessibility Statement criado e atualizado
- [ ] 🎯 VPAT (Voluntary Product Accessibility Template) preenchido
- [ ] 📊 Audit report de acessibilidade documentado
- [ ] 🔄 Plano de remediação para issues encontrados
- [ ] 📚 Guia de acessibilidade para usuários

### ⚖️ **Compliance Legal**
- [ ] 🌍 **WCAG 2.1 AA**: Conformidade completa validada
- [ ] 🇺🇸 **ADA**: Americans with Disabilities Act
- [ ] 🇪🇺 **EN 301 549**: European Accessibility Act
- [ ] 🇧🇷 **LBI**: Lei Brasileira de Inclusão considerada
- [ ] 📋 Evidências de compliance documentadas

---

## ✅ Critérios de Aprovação de Acessibilidade

### 🟢 **TOTALMENTE ACESSÍVEL (AAA em algumas áreas)**
- [ ] 100% dos critérios WCAG 2.1 AA atendidos
- [ ] Alguns critérios AAA implementados
- [ ] Testes com usuários reais bem-sucedidos
- [ ] Zero barreiras críticas identificadas

### 🟡 **ACESSÍVEL (AA Compliant)**
- [ ] 95%+ dos critérios WCAG 2.1 AA atendidos
- [ ] Issues menores documentados com plano de correção
- [ ] Funcionalidade core totalmente acessível
- [ ] Testes automatizados passando

### 🔴 **REQUER CORREÇÃO (Não Compliant)**
- [ ] Barreiras críticas de acessibilidade presentes
- [ ] Funcionalidade core inacessível
- [ ] Falhas em critérios de sucesso de Nível A
- [ ] Testes com usuários revelaram problemas sérios

---

## 🎯 Plano de Implementação

### 🏗️ **Fase 1: Foundation**
1. **Estrutura Semântica**: HTML válido e bem estruturado
2. **Contraste e Cores**: Atender requisitos mínimos
3. **Navegação por Teclado**: Funcionalidade básica
4. **Alt Text**: Imagens e elementos informativos

### 🔧 **Fase 2: Enhancement**
1. **ARIA Implementation**: Labels, roles, states
2. **Formulários Avançados**: Validação e feedback
3. **Componentes Customizados**: Widgets acessíveis
4. **Live Regions**: Atualizações dinâmicas

### 🚀 **Fase 3: Optimization**
1. **Testes com Usuários**: Validação real
2. **Performance**: Otimização para tecnologias assistivas
3. **Documentação**: Guias e treinamentos
4. **Monitoramento**: Métricas contínuas

---

## 🔄 Melhoria Contínua

### 📊 **Monitoramento Contínuo**
- [ ] 🤖 Testes automatizados em CI/CD
- [ ] 📈 Métricas de acessibilidade no dashboard
- [ ] 👥 Feedback de usuários com deficiências
- [ ] 🔍 Auditorias regulares de acessibilidade

### 🎓 **Educação e Treinamento**
- [ ] 📚 Treinamento da equipe em acessibilidade
- [ ] 📋 Guidelines e checklists atualizados
- [ ] 🎯 Champions de acessibilidade na equipe
- [ ] 🔄 Workshops e sessões de aprendizado

---

*♿ Validado por Cecília - UX Expert PRISMA*
*"A web é para todos. Acessibilidade não é um recurso, é um direito."*