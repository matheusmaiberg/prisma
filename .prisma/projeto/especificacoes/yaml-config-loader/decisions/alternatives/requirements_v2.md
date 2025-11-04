# Requirements Specification: YamlConfigLoader
**Versão**: 1.0
**Analista**: v2 (Perspectiva: User Experience & Migration)
**Data**: 2025-01-15
**Status**: Draft

---

## 1. Visão Geral do Sistema

### 1.1 Problema a Resolver

**Situação Atual**:
```typescript
// AgentManager.ts - linha 64
const targetDir = path.join(this.workspaceRoot, '.claude/agents/prisma'); // HARDCODED

// constants.ts - linha 18
paths: {
  specs: `.prisma/projeto/${dirs.specs}`,  // COMPUTED, mas não customizável
  steering: `.claude/${dirs.steering}`,
  settings: `.claude/${dirs.settings}`
}
```

**Problemas**:
1. **Inflexibilidade**: Usuários não podem customizar paths sem editar código TypeScript
2. **Duplicação**: Mesmos paths repetidos em múltiplos arquivos
3. **Acoplamento**: AgentManager conhece estrutura de diretórios internos
4. **YAML Desperdiçado**: js-yaml instalado mas não usado para configs

### 1.2 Visão da Solução

Criar sistema de configuração hierárquico com 3 camadas:

```
┌─────────────────────────────────────────┐
│  Layer 3: YAML Files (Highest Priority) │  ← Usuário customiza aqui
├─────────────────────────────────────────┤
│  Layer 2: JSON Settings                 │  ← Compatibilidade v1.0
├─────────────────────────────────────────┤
│  Layer 1: TypeScript Defaults           │  ← Fallback final
└─────────────────────────────────────────┘
```

**Exemplo de Fluxo**:
```typescript
// Usuário customiza .prisma/configuracoes/prisma/caminhos.yaml
paths:
  agents: .meus-agentes/customizados

// Sistema resolve: YAML > JSON > defaults
configManager.getPath('agents')  // → '.meus-agentes/customizados'
```

---

## 2. User Stories

### Epic 1: Configuração Dinâmica de Paths

**US001** - Como desenvolvedor da extensão, quero usar paths dinâmicos em vez de hardcoded, para facilitar manutenção e evitar duplicação.

**Critérios de Aceitação**:
- [ ] AgentManager não possui strings hardcoded de paths
- [ ] Mudanças de paths são centralizadas em YAMLs
- [ ] Refactoring de paths não requer rebuild da extensão

**US002** - Como usuário avançado, quero customizar paths de agentes via YAML, para organizar meu workspace de forma personalizada.

**Critérios de Aceitação**:
- [ ] Editar `.prisma/configuracoes/prisma/caminhos.yaml` altera paths
- [ ] Extensão respeita paths customizados após restart
- [ ] Documentação explica como customizar YAMLs

**US003** - Como usuário iniciante, quero que a extensão funcione out-of-the-box sem configurar YAMLs, para começar rapidamente sem conhecimento técnico.

**Critérios de Aceitação**:
- [ ] Primeira execução cria YAMLs com valores padrão
- [ ] Defaults são idênticos ao comportamento atual
- [ ] Nenhuma quebra de funcionalidade para usuários existentes

### Epic 2: Validação e Error Handling

**US004** - Como desenvolvedor, quero que erros de sintaxe YAML não quebrem a extensão, para garantir estabilidade mesmo com configs inválidas.

**Critérios de Aceitação**:
- [ ] Parse errors são logados no OutputChannel
- [ ] Sistema usa fallback (JSON ou defaults) automaticamente
- [ ] Mensagem de erro indica arquivo e linha do problema

**US005** - Como usuário, quero ser notificado quando meu YAML está inválido, para corrigir rapidamente sem debugging complexo.

**Critérios de Aceitação**:
- [ ] VSCode mostra notificação de erro (toast)
- [ ] Mensagem inclui path do arquivo problemático
- [ ] Link "Open File" leva diretamente ao YAML

**US006** - Como desenvolvedor, quero validação de tipos para configs, para detectar erros em tempo de desenvolvimento.

**Critérios de Aceitação**:
- [ ] Zod schemas validam estrutura de YAMLs
- [ ] TypeScript types refletem schemas Zod
- [ ] Intellisense funciona para configs tipadas

### Epic 3: Migration & Retrocompatibilidade

**US007** - Como usuário da v1.0, quero que minha configuração JSON continue funcionando, para evitar quebra após atualizar extensão.

**Critérios de Aceitação**:
- [ ] `.claude/settings/prisma.settings.json` ainda é lido
- [ ] JSON tem prioridade sobre defaults (mas não sobre YAML)
- [ ] Nenhum breaking change na API de ConfigManager

**US008** - Como desenvolvedor, quero migrar gradualmente de hardcoded para YAML, para minimizar riscos de regressão.

**Critérios de Aceitação**:
- [ ] YamlConfigLoader pode ser ativado/desativado via feature flag
- [ ] Modo legacy (só JSON+defaults) permanece funcional
- [ ] Testes cobrem ambos os modos (YAML ON/OFF)

---

## 3. Requisitos Funcionais (MoSCoW)

### 3.1 MUST Have (P0 - Blocker)

**RF-M001**: Sistema MUST carregar YAMLs de `.prisma/configuracoes/prisma/` durante startup da extensão.

**RF-M002**: Sistema MUST validar schemas usando Zod e usar fallback em caso de erro.

**RF-M003**: ConfigManager MUST resolver paths com precedência: YAML > JSON > defaults.

**RF-M004**: AgentManager MUST usar `configManager.getPath()` em vez de paths hardcoded.

**RF-M005**: Sistema MUST criar YAMLs padrão na primeira execução se não existirem.

### 3.2 SHOULD Have (P1 - High Priority)

**RF-S001**: Sistema SHOULD logar erros de parse no VSCode OutputChannel com detalhes (arquivo, linha, campo).

**RF-S002**: Sistema SHOULD mostrar notificação VSCode quando YAML é inválido.

**RF-S003**: Sistema SHOULD normalizar paths (remover `./`, `../`, converter `\` para `/`).

**RF-S004**: Sistema SHOULD validar inexistência de path traversal (segurança).

### 3.3 COULD Have (P2 - Nice to Have)

**RF-C001**: Sistema COULD criar comando VSCode "Prisma: Validate YAML Configs" para validação manual.

**RF-C002**: Sistema COULD gerar JSON Schema para autocomplete de YAMLs em VSCode.

**RF-C003**: Sistema COULD suportar variáveis de ambiente em YAMLs (ex: `${HOME}/.claude`).

### 3.4 WON'T Have (Out of Scope)

**RF-W001**: Sistema WON'T implementar hot-reload de YAMLs (requer restart).

**RF-W002**: Sistema WON'T criar UI visual para editar YAMLs (usar editor de texto).

**RF-W003**: Sistema WON'T migrar automaticamente JSON para YAML (manual).

---

## 4. Requisitos Não-Funcionais

### 4.1 Usabilidade

**RNF-U001**: Defaults devem ser idênticos ao comportamento atual (zero mudanças percebidas por usuários que não customizam).

**RNF-U002**: Documentação deve incluir exemplos de customização de YAMLs (pelo menos 3 casos de uso).

**RNF-U003**: Mensagens de erro devem ser acionáveis (indicar exatamente o que corrigir).

### 4.2 Performance

**RNF-P001**: Carregamento de YAMLs não deve adicionar > 100ms ao startup da extensão.

**RNF-P002**: Validação Zod não deve adicionar > 50ms ao startup.

**RNF-P003**: Merge de configs (YAML + JSON + defaults) deve completar em < 20ms.

### 4.3 Segurança

**RNF-SEC001**: Sistema deve prevenir path traversal (rejeitar paths com `../` fora do workspace).

**RNF-SEC002**: Logs de erro não devem expor conteúdo completo de YAMLs (apenas metadata).

### 4.4 Testabilidade

**RNF-T001**: Cobertura de testes ≥ 80% para YamlConfigLoader e ConfigSchema.

**RNF-T002**: Testes devem cobrir cenários: YAML válido, inválido, ausente, conflitante.

**RNF-T003**: Testes de integração devem validar ConfigManager ↔ YamlConfigLoader.

### 4.5 Manutenibilidade

**RNF-M001**: Adicionar novo campo de config deve requerer mudanças em apenas 3 arquivos (schema Zod, interface TS, YAML default).

**RNF-M002**: Código deve seguir padrão Singleton para YamlConfigLoader (como ConfigManager).

---

## 5. Arquitetura de Dados

### 5.1 Estrutura de YAMLs

**caminhos.yaml** (Prioridade: P0 - MUST)
```yaml
# Paths de diretórios da extensão
paths:
  agents: .claude/agents/prisma        # Onde agentes built-in são copiados
  prompts: .claude/system-prompts      # System prompts globais
  commands: .claude/commands/prisma    # Slash commands
  templates: .claude/templates         # Templates de specs
  specs: .prisma/projeto/especificacoes  # Especificações de features
  steering: .claude/steering           # Steering documents
  settings: .claude/settings           # Configurações JSON
```

**integracoes.yaml** (Prioridade: P0 - MUST)
```yaml
# Integrações com sistemas externos
claude:
  invocationMode: cli  # cli | extension
  cliPath: claude      # Path para CLI do Claude
  terminal:
    activationDelay: 800  # ms para aguardar ativação de venv
```

**qualidade.yaml** (Prioridade: P1 - SHOULD)
```yaml
# Configurações de validação e qualidade
validation:
  enabled: true           # Ativar validação de schemas
  strictMode: false       # Se true, erros bloqueiam startup
  logLevel: warn          # error | warn | info | debug
  showNotifications: true # Mostrar toasts no VSCode
```

**sistema.yaml** (Prioridade: P2 - COULD - fora do escopo inicial)
```yaml
# Configurações gerais da extensão
extension:
  autoRefresh: true
  showWelcomeMessage: true
  checkUpdatesOnStartup: true
```

### 5.2 Schema de Merge

**Exemplo de Conflito**:
```yaml
# caminhos.yaml
paths:
  agents: .meus-agentes
  specs: .prisma/specs

# integracoes.yaml
paths:
  agents: .outros-agentes  # ← Sobrescreve!
```

**Resolução**: Último arquivo carregado (ordem alfabética) vence.

**Alternativa**: Usar namespaces (ex: `caminhos.paths.agents` vs `integracoes.paths.agents`) - **recomendado**.

---

## 6. Fluxo de Inicialização

### 6.1 Startup da Extensão

```
1. Extension.activate()
   ↓
2. ConfigManager.getInstance()
   ↓
3. YamlConfigLoader.getInstance()
   ↓
4. YamlConfigLoader.loadAll()
   ├─ Scan .prisma/configuracoes/prisma/*.yaml
   ├─ Parse cada YAML com js-yaml
   ├─ Validate com Zod schemas
   ├─ Merge configs (alfabético)
   ↓
5. ConfigManager.loadSettings()
   ├─ Load JSON (.claude/settings/prisma.settings.json)
   ├─ Merge YAML > JSON > defaults
   ↓
6. AgentManager.initializeBuiltInAgents()
   ├─ Get path com configManager.getPath('agents')
   ├─ Copy agentes para path dinâmico
```

### 6.2 Error Handling

```
Parse Error (sintaxe YAML inválida)
   ↓
1. Log error no OutputChannel
   ├─ Filename: caminhos.yaml
   ├─ Line: 5
   ├─ Error: "unexpected token"
   ↓
2. Show VSCode notification
   ├─ Message: "Config inválida: caminhos.yaml (linha 5)"
   ├─ Actions: [Open File] [Ignore]
   ↓
3. Fallback to JSON/defaults
   ├─ Skip este YAML
   ├─ Continue com próximo arquivo
```

---

## 7. Migration Guide (para usuários v1.0)

### 7.1 Sem Ação Necessária (Default)

✅ **Usuários que nunca editaram configs**:
- Nada muda
- YAMLs são criados automaticamente com valores padrão
- Comportamento idêntico à v1.0

### 7.2 Usuários com JSON Customizado

⚙️ **Se você editou `.claude/settings/prisma.settings.json`**:
- JSON continua funcionando
- Se quiser, migre valores para YAMLs (não obrigatório)
- YAML sobrescreve JSON se ambos existirem

**Exemplo de Migração**:
```json
// .claude/settings/prisma.settings.json (antigo)
{
  "paths": {
    "specs": ".minhas-specs"
  }
}
```
↓
```yaml
# .prisma/configuracoes/prisma/caminhos.yaml (novo)
paths:
  specs: .minhas-specs
```

### 7.3 Desenvolvedores da Extensão

🔧 **Se você contribui para o código**:
1. Substitua paths hardcoded por `configManager.getPath()`
2. Adicione novos campos em schema Zod (não em TypeScript diretamente)
3. Atualize YAMLs default quando adicionar novo path

---

## 8. Casos de Uso Detalhados

### 8.1 Caso de Uso: Usuário Customiza Path de Agentes

**Ator**: Usuário avançado
**Objetivo**: Organizar agentes personalizados em diretório separado

**Pré-condições**:
- Extensão instalada
- Workspace VSCode aberto

**Fluxo Principal**:
1. Usuário abre `.prisma/configuracoes/prisma/caminhos.yaml`
2. Edita campo `paths.agents: .meus-agentes/customizados`
3. Salva arquivo
4. Recarrega VSCode (Reload Window)
5. Extensão carrega agentes de `.meus-agentes/customizados`

**Fluxo Alternativo (Erro)**:
3a. Usuário digita YAML inválido (`paths agents .meus-agentes`)
3b. Sistema mostra notificação "Config inválida: caminhos.yaml"
3c. Sistema usa fallback (JSON ou default)
3d. Usuário corrige sintaxe e recarrega

**Pós-condições**:
- Agentes são lidos do path customizado
- Logs confirmam path usado: "Loading agents from .meus-agentes/customizados"

### 8.2 Caso de Uso: Desenvolvedor Adiciona Novo Path

**Ator**: Desenvolvedor da extensão
**Objetivo**: Adicionar suporte a path de plugins

**Pré-condições**:
- Branch de desenvolvimento
- Conhecimento de Zod e TypeScript

**Fluxo Principal**:
1. Edita `src/services/config/ConfigSchema.ts`
   ```typescript
   paths: z.object({
     // ... campos existentes
     plugins: z.string().optional()  // NOVO
   })
   ```
2. Edita `src/types/config.types.ts`
   ```typescript
   paths: {
     // ...
     plugins?: string;  // NOVO
   }
   ```
3. Atualiza YAML default em `dist/resources/configuracoes/caminhos.yaml`
   ```yaml
   paths:
     # ...
     plugins: .claude/plugins  # NOVO
   ```
4. Atualiza `constants.ts`
   ```typescript
   paths: {
     // ...
     plugins: '.claude/plugins'  // NOVO
   }
   ```
5. Usa em código: `configManager.getPath('plugins')`
6. Compila e testa

**Pós-condições**:
- Novo path disponível para toda a extensão
- TypeScript valida uso correto
- Usuários podem customizar via YAML

---

## 9. Critérios de Aceitação (Checklist de Teste)

### 9.1 Funcionalidade Core

- [ ] **AC001**: YamlConfigLoader carrega 3 YAMLs (caminhos, integracoes, qualidade) corretamente
- [ ] **AC002**: Merge de configs respeita ordem: YAML > JSON > defaults
- [ ] **AC003**: YAML inválido usa fallback sem crashar extensão
- [ ] **AC004**: Primeira execução cria YAMLs padrão em `.prisma/configuracoes/prisma/`
- [ ] **AC005**: AgentManager usa paths dinâmicos (sem hardcoded)

### 9.2 Error Handling

- [ ] **AC006**: Parse error loga mensagem no OutputChannel com filename e linha
- [ ] **AC007**: Notificação VSCode aparece quando YAML é inválido
- [ ] **AC008**: Botão "Open File" na notificação abre YAML no editor
- [ ] **AC009**: Schema inválido (campo errado) mostra erro detalhado
- [ ] **AC010**: Path traversal (`../../../etc`) é rejeitado

### 9.3 Performance

- [ ] **AC011**: Carregamento de YAMLs adiciona < 100ms ao startup
- [ ] **AC012**: Validação Zod adiciona < 50ms ao startup
- [ ] **AC013**: Merge de configs completa em < 20ms

### 9.4 Retrocompatibilidade

- [ ] **AC014**: JSON existente continua funcionando (usuários v1.0)
- [ ] **AC015**: ConfigManager API não muda (código cliente funciona)
- [ ] **AC016**: Defaults são idênticos ao comportamento v1.0

### 9.5 Documentação

- [ ] **AC017**: README inclui seção "Customizando Paths via YAML"
- [ ] **AC018**: Exemplo de YAML customizado está documentado
- [ ] **AC019**: Migration guide para usuários v1.0 está disponível

---

## 10. Riscos e Mitigações (Foco em UX)

| ID | Risco | Impacto UX | Mitigação |
|----|-------|------------|-----------|
| R1 | Usuário edita YAML errado e extensão para de funcionar | **CRÍTICO** | Fallback robusto + notificação clara |
| R2 | Usuário não sabe que pode customizar paths | Baixo | Documentação + comentários nos YAMLs |
| R3 | Conflito entre YAML e JSON confunde usuário | Médio | Log explícito mostrando precedência |
| R4 | Performance degrada em workspaces grandes | Médio | Cache de configs + benchmark |
| R5 | Breaking change para usuários v1.0 | **CRÍTICO** | Testes extensivos + JSON ainda funciona |

---

## 11. Glossário

- **Fallback**: Comportamento padrão quando operação primária falha
- **Precedência**: Ordem de prioridade na resolução de conflitos (YAML > JSON > defaults)
- **Path Traversal**: Ataque usando `../` para acessar arquivos fora do workspace
- **Singleton**: Padrão de design que garante apenas uma instância de classe
- **Zod**: Biblioteca TypeScript para validação e parsing de schemas

---

## 12. Referências

- User Story anterior da v1.0 (se existir)
- VSCode Extension API - Configuration: https://code.visualstudio.com/api/references/contribution-points#contributes.configuration
- js-yaml: https://github.com/nodeca/js-yaml
- Zod: https://zod.dev/

---

**Aprovado por**: _[Pendente]_
**Data de Aprovação**: _[Pendente]_
**Revisores Sugeridos**: Tech Lead (arquitetura), UX Designer (migration guide)
