# Requirements Specification: YamlConfigLoader
**Versão**: 1.0
**Analista**: v1 (Perspectiva: Arquitetura & Integração)
**Data**: 2025-01-15
**Status**: Draft

---

## 1. Visão Geral

### 1.1 Contexto do Problema

A extensão VSCode "Prisma for Claude Code" atualmente possui:
- **8 arquivos YAML** inexistentes em `.prisma/configuracoes/prisma/` (mencionados na descrição mas não criados)
- **Paths hardcoded** em `AgentManager` (linhas 64, 104, 138, 159, 179, 319, 336) e `constants.ts`
- **ConfigManager** que lê APENAS JSON de `.claude/settings/prisma.settings.json` (linhas 51-67)
- **js-yaml ^4.1.0** instalado mas não utilizado para configurações do sistema
- **Sem validação** de schemas para garantir integridade das configurações

**Impacto**: Configuração rígida, dificulta customização de paths, e cria duplicação (mesma config em múltiplos lugares).

### 1.2 Objetivo

Criar um sistema de carregamento de configurações YAML que:
1. Substitua paths hardcoded por configurações dinâmicas
2. Unifique múltiplas fontes de configuração (YAML + JSON + defaults)
3. Valide schemas com type safety (Zod)
4. Seja retrocompatível com ConfigManager existente

### 1.3 Escopo

**Inclui**:
- Criação de YamlConfigLoader service
- Definição de schemas Zod para validação
- Criação de TypeScript interfaces tipadas
- Integração com ConfigManager via Adapter Pattern
- Migração de paths hardcoded em AgentManager

**Exclui**:
- Criação de UI para edição de YAMLs (usar editor de texto)
- Migração de outros hardcoded values fora de paths
- Hot-reload de configurações (requer restart da extensão)

---

## 2. Stakeholders

| Papel | Nome/Descrição | Interesses |
|-------|----------------|------------|
| **Desenvolvedores da Extensão** | Time Prisma | Facilitar customização de paths, reduzir manutenção |
| **Usuários Avançados** | Desenvolvedores que customizam Prisma | Configurar paths personalizados via YAML |
| **ConfigManager** | Sistema existente | Manter retrocompatibilidade, não quebrar API |

---

## 3. Requisitos Funcionais (EARS)

### 3.1 Carregamento de Configurações

**RF001** - WHEN a extensão é ativada, THEN o sistema MUST carregar configurações de `.prisma/configuracoes/prisma/*.yaml` em ordem alfabética.

**RF002** - WHEN múltiplos arquivos YAML existem, THEN o sistema MUST fazer merge das configurações (último arquivo sobrescreve anteriores).

**RF003** - WHERE um arquivo YAML contém erro de sintaxe, THEN o sistema MUST logar erro no OutputChannel e MUST usar fallback (JSON ou defaults).

**RF004** - IF nenhum YAML existe, THEN o sistema MUST criar arquivos YAML padrão com configurações iniciais (8 arquivos: integracoes, caminhos, linguagem, repositorio, workflow, qualidade, sistema, notificacoes).

### 3.2 Hierarquia de Configurações

**RF005** - WHEN valores conflitantes existem, THEN a precedência MUST ser: YAML > JSON > defaults (nesta ordem).

**RF006** - WHERE YAML define `paths.specs`, THEN este valor MUST sobrescrever `DEFAULT_PATHS.specs` de constants.ts.

**RF007** - IF JSON existe mas YAML não, THEN JSON MUST ser usado (retrocompatibilidade).

### 3.3 Validação de Schemas

**RF008** - WHEN YAML é carregado, THEN o sistema MUST validar estrutura usando Zod schemas.

**RF009** - WHERE validação falha, THEN o sistema MUST logar erros detalhados (campo, valor esperado, valor recebido) e MUST usar fallback.

**RF010** - IF schema permite valores opcionais, THEN valores ausentes MUST usar defaults de constants.ts.

### 3.4 API Tipada

**RF011** - WHEN ConfigManager chama `getPath()`, THEN YamlConfigLoader MUST retornar path resolvido (YAML → JSON → default).

**RF012** - WHERE AgentManager solicita path, THEN ConfigManager MUST retornar valor dinâmico (não hardcoded).

**RF013** - IF novo campo YAML é adicionado, THEN TypeScript MUST detectar tipo incorreto (type safety).

### 3.5 Integração com AgentManager

**RF014** - WHEN AgentManager inicializa, THEN MUST usar `configManager.getPath('agents')` em vez de `.claude/agents/prisma`.

**RF015** - WHERE AgentManager copia recursos, THEN MUST usar paths dinâmicos de ConfigManager.

**RF016** - IF path não existe, THEN sistema MUST criar diretórios automaticamente (como atualmente na linha 68).

---

## 4. Requisitos Não-Funcionais

### 4.1 Performance

**RNF001** - O carregamento de YAMLs MUST completar em < 100ms para até 20 arquivos YAML.

**RNF002** - Validação de schemas MUST adicionar < 50ms ao tempo de startup.

### 4.2 Compatibilidade

**RNF003** - ConfigManager existente MUST continuar funcionando sem mudanças de API pública.

**RNF004** - Código cliente que usa `configManager.getPath()` MUST funcionar sem modificações.

### 4.3 Manutenibilidade

**RNF005** - Schemas Zod MUST ser centralizados em `src/services/config/ConfigSchema.ts`.

**RNF006** - Cada tipo de configuração MUST ter interface TypeScript dedicada.

### 4.4 Segurança

**RNF007** - Validação MUST prevenir injection de paths maliciosos (path traversal).

**RNF008** - Erros de parse MUST NÃO expor conteúdo sensível em logs.

---

## 5. Restrições

### 5.1 Técnicas

- **RT001**: MUST usar biblioteca js-yaml ^4.1.0 (já instalada)
- **RT002**: MUST usar Zod para validação (adicionar dependência)
- **RT003**: MUST manter VSCode Extension API 1.84.0+
- **RT004**: NÃO pode usar file watchers (hot-reload) - requer restart

### 5.2 Arquiteturais

- **RA001**: YamlConfigLoader MUST ser singleton
- **RA002**: ConfigManager MUST usar Adapter Pattern para integração
- **RA003**: Paths hardcoded MUST ser substituídos por chamadas a ConfigManager

---

## 6. Dependências

### 6.1 Sistemas Existentes

| Sistema | Dependência | Impacto de Quebra |
|---------|-------------|-------------------|
| ConfigManager | Alto - requer integração | CRÍTICO - extensão não funciona |
| AgentManager | Médio - requer refactor | ALTO - agentes não carregam |
| constants.ts | Baixo - pode ser deprecated | MÉDIO - outros módulos dependem |

### 6.2 Bibliotecas

- **js-yaml**: Já instalada (^4.1.0) - parsing de YAML
- **zod**: Adicionar (~10KB gzipped) - validação de schemas

---

## 7. Riscos e Mitigações

| ID | Risco | Probabilidade | Impacto | Mitigação |
|----|-------|---------------|---------|-----------|
| R1 | Conflito de path resolution | ALTO | ALTO | YAML como fonte primária (RF005) |
| R2 | Performance degradation | MÉDIO | MÉDIO | Cache de configs carregadas |
| R3 | Parse errors quebram extensão | ALTO | CRÍTICO | Fallback robusto (RF003) + try-catch |
| R4 | Breaking changes no ConfigManager | ALTO | CRÍTICO | Adapter Pattern + testes retrocompatibilidade |
| R5 | Paths maliciosos (../../../etc/passwd) | BAIXO | ALTO | Validação de paths + normalização |

---

## 8. Estrutura de Arquivos YAML

### 8.1 `.prisma/configuracoes/prisma/caminhos.yaml`

```yaml
paths:
  agents: .claude/agents/prisma
  prompts: .claude/system-prompts
  commands: .claude/commands/prisma
  templates: .claude/templates
  specs: .prisma/projeto/especificacoes
  steering: .claude/steering
  settings: .claude/settings
```

### 8.2 `.prisma/configuracoes/prisma/integracoes.yaml`

```yaml
claude:
  invocationMode: cli  # cli | extension
  cliPath: claude
  terminal:
    activationDelay: 800  # ms
```

### 8.3 `.prisma/configuracoes/prisma/qualidade.yaml`

```yaml
validation:
  enabled: true
  strictMode: false  # Se true, falhas de validação bloqueiam startup
  logLevel: warn     # error | warn | info | debug
```

### 8.4 Outros YAMLs

- **linguagem.yaml**: Configurações de i18n (fora do escopo inicial)
- **repositorio.yaml**: Configurações de Git (fora do escopo inicial)
- **workflow.yaml**: Configurações de workflow Prisma (fora do escopo inicial)
- **sistema.yaml**: Configurações gerais da extensão (fora do escopo inicial)
- **notificacoes.yaml**: Configurações de notificações (fora do escopo inicial)

**Nota**: Foco inicial em **caminhos.yaml**, **integracoes.yaml** e **qualidade.yaml**. Demais arquivos podem ser implementados em fases futuras.

---

## 9. Critérios de Aceitação

### 9.1 Funcionalidade

- [ ] YamlConfigLoader carrega todos os YAMLs de `.prisma/configuracoes/prisma/`
- [ ] Merge de configurações respeita precedência (YAML > JSON > defaults)
- [ ] Validação Zod detecta schemas inválidos e usa fallback
- [ ] ConfigManager retorna paths dinâmicos via `getPath()`
- [ ] AgentManager não possui paths hardcoded

### 9.2 Qualidade

- [ ] Cobertura de testes ≥ 80% para YamlConfigLoader
- [ ] Testes unitários para schemas Zod (válidos e inválidos)
- [ ] Testes de integração ConfigManager ↔ YamlConfigLoader
- [ ] Documentação de uso em README ou docs/

### 9.3 Performance

- [ ] Startup da extensão não aumenta em > 100ms
- [ ] Benchmark de carregamento de YAMLs < 50ms

---

## 10. Questões em Aberto

| ID | Questão | Responsável | Prazo |
|----|---------|-------------|-------|
| Q1 | Criar todos os 8 YAMLs ou apenas os 3 prioritários? | Time Prisma | Antes do design |
| Q2 | Usar zod ou joi para validação? | Arquiteto | Antes da implementação |
| Q3 | Deprecar constants.ts completamente ou manter como fallback? | Tech Lead | Antes do refactor |
| Q4 | Implementar migrations para usuários existentes? | Product Owner | Antes do release |

---

## 11. Glossário

- **YAML**: Yet Another Markup Language - formato de serialização de dados
- **Zod**: Biblioteca TypeScript para validação e parsing de schemas
- **Adapter Pattern**: Padrão de design que permite compatibilidade entre interfaces incompatíveis
- **Fallback**: Valor ou comportamento padrão usado quando operação primária falha
- **Path Traversal**: Ataque de segurança que usa `../` para acessar arquivos fora do diretório permitido

---

## 12. Referências

- [js-yaml Documentation](https://github.com/nodeca/js-yaml)
- [Zod Documentation](https://zod.dev/)
- [VSCode Extension API](https://code.visualstudio.com/api)
- [ConfigManager.ts](c:\Users\Windows Home\Documents\GitHub\prisma\src\utils\configManager.ts)
- [AgentManager.ts](c:\Users\Windows Home\Documents\GitHub\prisma\src\features\agents\agentManager.ts)

---

**Aprovado por**: _[Pendente]_
**Data de Aprovação**: _[Pendente]_
