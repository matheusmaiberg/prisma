# Exemplos de Markdown Executável - PRISMA Framework

## 🎯 Visão Geral

Este documento demonstra na prática como criar documentação executável usando o PRISMA Framework. Cada exemplo é funcional e pode ser copiado diretamente para seus projetos.

## 📋 Exemplos Básicos

### 1. Código Testável Simples

```markdown
<!-- PRISMA:teste -->
```javascript
// Função de validação de email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// PRISMA:expect
console.log(validarEmail("user@example.com")) // => true
console.log(validarEmail("email-inválido"))    // => false
```
<!-- /PRISMA:teste -->
```

### 2. Teste com Múltiplas Asserções

```markdown
<!-- PRISMA:teste nome="calculadora" -->
```typescript
class Calculadora {
  somar(a: number, b: number): number {
    return a + b
  }

  multiplicar(a: number, b: number): number {
    return a * b
  }

  dividir(a: number, b: number): number {
    if (b === 0) throw new Error("Divisão por zero")
    return a / b
  }
}

// PRISMA:expect
const calc = new Calculadora()
expect(calc.somar(2, 3)).toBe(5)
expect(calc.multiplicar(4, 5)).toBe(20)
expect(calc.dividir(10, 2)).toBe(5)
expect(() => calc.dividir(10, 0)).toThrow("Divisão por zero")
```
<!-- /PRISMA:teste -->
```

### 3. Teste com Setup e Teardown

```markdown
<!-- PRISMA:teste setup="true" teardown="true" -->
```typescript
// Setup executado antes do teste
let database: Database
let server: Server

// PRISMA:setup
database = await createTestDatabase()
server = await startTestServer()
console.log("Ambiente de teste inicializado")

// Código principal do teste
async function criarUsuario(dados: UserData) {
  return await database.users.create(dados)
}

// PRISMA:expect
const user = await criarUsuario({
  nome: "João",
  email: "joao@test.com"
})
expect(user.id).toBeDefined()
expect(user.nome).toBe("João")

// PRISMA:teardown
await database.cleanup()
await server.stop()
console.log("Ambiente de teste limpo")
```
<!-- /PRISMA:teste -->
```

## 🔗 Links Auto-Verificados

### Links Internos
```markdown
<!-- PRISMA:link -->
Para mais detalhes sobre configuração, veja [Guia de Setup](./setup-guide.md#configuração-inicial)
<!-- /PRISMA:link -->

<!-- PRISMA:link -->
Consulte também a [API Reference](../api/endpoints.md#authentication) para exemplos de uso
<!-- /PRISMA:link -->
```

### Links Externos com Validação
```markdown
<!-- PRISMA:link externo="true" validar="true" -->
Baseado na [documentação oficial do JWT](https://jwt.io/introduction/) - *última verificação: válido*
<!-- /PRISMA:link -->

<!-- PRISMA:link externo="true" validar="false" -->
Referência opcional: [Blog post sobre JWT](https://example-blog.com/jwt-tutorial) - *não validado*
<!-- /PRISMA:link -->
```

## 💻 Comandos Executáveis

### Comando Básico
```markdown
<!-- PRISMA:comando -->
```bash
npm --version
# Output esperado: "8.x.x" ou superior
```
<!-- /PRISMA:comando -->
```

### Comando com Validação de Sucesso
```markdown
<!-- PRISMA:comando sucesso="zero" -->
```bash
npm run test
# Deve retornar código 0 (sucesso)
# Output deve conter: "All tests passed"
```
<!-- /PRISMA:comando -->
```

### Comando com Timeout
```markdown
<!-- PRISMA:comando timeout="30s" -->
```bash
npm run build:production
# Timeout: 30 segundos
# Output esperado: "Build completed successfully"
```
<!-- /PRISMA:comando -->
```

### Sequência de Comandos
```markdown
<!-- PRISMA:comando sequencial="true" -->
```bash
# Passo 1: Limpar cache
npm cache clean --force
# Output esperado: "npm cache cleaned"

# Passo 2: Instalar dependências
npm install
# Output esperado: "added X packages"

# Passo 3: Executar build
npm run build
# Output esperado: "Build completed"
```
<!-- /PRISMA:comando -->
```

## 🤖 Orquestração de Agentes

### Agente Simples
```markdown
<!-- PRISMA:agente type="dev" -->
*implementar "componente de header responsivo"

**Critérios**:
- Mobile-first approach
- Acessibilidade WCAG AA
- Performance otimizada
<!-- /PRISMA:agente -->
```

### Múltiplos Agentes em Sequência
```markdown
<!-- PRISMA:workflow nome="feature-login" -->
**Objetivo**: Implementar sistema de login completo

## Fase 1: Requisitos
<!-- PRISMA:agente type="pm" -->
*validar-requisitos "autenticação com JWT"

**Especificações**:
- Login com email/senha
- Token JWT com expiração
- Refresh token automático
- Rate limiting
<!-- /PRISMA:agente -->

## Fase 2: Design Técnico
<!-- PRISMA:agente type="arquiteto" -->
*analisar-arquitetura "sistema de autenticação"

**Decisões técnicas**:
- JWT com RS256
- Redis para blacklist
- bcrypt para senhas
- Middleware de autenticação
<!-- /PRISMA:agente -->

## Fase 3: Implementação
<!-- PRISMA:agente type="dev" -->
*implementar-endpoints "/auth/login e /auth/refresh"
*implementar-middleware "autenticação JWT"
*implementar-helpers "validação e criptografia"
<!-- /PRISMA:agente -->

## Fase 4: Testes
<!-- PRISMA:agente type="qa" -->
*criar-testes-unitarios "módulo de autenticação"
*criar-testes-integracao "fluxo completo de login"
*validar-seguranca "vulnerabilidades comuns"
<!-- /PRISMA:agente -->
<!-- /PRISMA:workflow -->
```

### Agentes Paralelos
```markdown
<!-- PRISMA:agente paralelo="true" -->
**Tarefas simultâneas**:

**Dev Frontend**:
*implementar "tela de login React"
*implementar "contexto de autenticação"

**Dev Backend**:
*implementar "endpoints de auth"
*implementar "middleware JWT"

**QA**:
*preparar "cenários de teste"
*configurar "ambiente de teste"

**Sincronização**: Aguardar conclusão de todos antes de prosseguir
<!-- /PRISMA:agente -->
```

## ✅ Pré-requisitos Verificados

### Verificação de Sistema
```markdown
<!-- PRISMA:requisitos tipo="sistema" -->
**Ambiente de Desenvolvimento**:
- Node.js >= 18.0.0
- npm >= 8.0.0
- Git >= 2.30.0
- Docker >= 20.0.0

**Ferramentas Opcionais**:
- VS Code com extensão TypeScript
- Postman ou similar para testes de API

**Sistema Operacional**:
- Suportado: Windows 10+, macOS 10.15+, Ubuntu 20.04+
<!-- /PRISMA:requisitos -->
```

### Verificação de Dependências
```markdown
<!-- PRISMA:requisitos tipo="dependencias" arquivo="package.json" -->
**Dependências Obrigatórias**:
- express: ^4.18.0
- jsonwebtoken: ^9.0.0
- bcryptjs: ^2.4.3
- cors: ^2.8.5

**Dependências de Desenvolvimento**:
- typescript: ^5.0.0
- jest: ^29.0.0
- supertest: ^6.3.0
- @types/node: ^18.0.0
<!-- /PRISMA:requisitos -->
```

### Verificação de Configuração
```markdown
<!-- PRISMA:requisitos tipo="configuracao" -->
**Variáveis de Ambiente**:
- `JWT_SECRET` (obrigatória): String para assinatura JWT
- `JWT_EXPIRATION` (opcional): Tempo de expiração (padrão: 1h)
- `DATABASE_URL` (obrigatória): URL de conexão do banco
- `REDIS_URL` (opcional): URL do Redis para cache

**Arquivos de Configuração**:
- `.env` deve existir no root do projeto
- `tsconfig.json` configurado para Node.js
- `jest.config.js` para configuração de testes

**Portas Necessárias**:
- 3000: API principal
- 5432: PostgreSQL
- 6379: Redis (opcional)
<!-- /PRISMA:requisitos -->
```

## 🔄 Workflows Complexos

### Workflow com Condições
```markdown
<!-- PRISMA:workflow nome="deploy-inteligente" condicional="true" -->
**Objetivo**: Deploy inteligente baseado em qualidade

## Análise de Qualidade
<!-- PRISMA:agente type="qa" -->
*analisar-qualidade "branch atual"
*calcular-metricas "cobertura, performance, segurança"
<!-- /PRISMA:agente -->

## Decisão Condicional
<!-- PRISMA:condicao -->
**Se** cobertura >= 80% E performance >= 90% E sem vulnerabilidades críticas:
  → Prosseguir para deploy automático

**Senão se** cobertura >= 70% E sem vulnerabilidades altas:
  → Deploy com aprovação manual necessária

**Senão**:
  → Bloquear deploy, solicitar correções
<!-- /PRISMA:condicao -->

## Deploy Automático (se aprovado)
<!-- PRISMA:agente type="dev" -->
*executar-testes "completo"
*executar-build "produção"
*deploy "staging primeiro, depois produção"
*monitorar "primeiros 10 minutos pós-deploy"
<!-- /PRISMA:agente -->
<!-- /PRISMA:workflow -->
```

### Workflow com Rollback
```markdown
<!-- PRISMA:workflow nome="deploy-com-rollback" -->
**Objetivo**: Deploy seguro com rollback automático

## Deploy
<!-- PRISMA:agente type="dev" -->
*backup-estado "antes do deploy"
*deploy-gradual "10% → 50% → 100% do tráfego"
<!-- /PRISMA:agente -->

## Monitoramento
<!-- PRISMA:agente type="qa" -->
*monitorar-metricas "latência, erros, CPU, memória"
*alertar-se "qualquer métrica degradar > 20%"
<!-- /PRISMA:agente -->

## Rollback Automático (se necessário)
<!-- PRISMA:trigger condicao="metricas_degradadas" -->
<!-- PRISMA:agente type="dev" -->
*rollback-automatico "versão anterior"
*restaurar-estado "backup pré-deploy"
*notificar-equipe "rollback executado"
<!-- /PRISMA:agente -->
<!-- /PRISMA:trigger -->
<!-- /PRISMA:workflow -->
```

## 📊 Monitoramento e Dashboards

### Dashboard de Status
```markdown
<!-- PRISMA:dashboard tempo-real="true" -->
## 📊 Status do Projeto

### Métricas de Qualidade
```
Testes: ████████████████████░ 85% (170/200)
Cobertura: ██████████████████░░ 78%
Lint: ████████████████████ 100%
Security: ████████████████████ 100%
```

### Workflows Ativos
- 🟢 feature-authentication: 90% completo
- 🟡 feature-dashboard: 45% completo
- 🔴 feature-reporting: Bloqueado (dependência)

### Alertas Recentes
- ⚠️  Query lenta detectada em /api/users (2min atrás)
- 📈 CPU usage pico: 89% (5min atrás)
- ✅ Deploy produção bem-sucedido (1h atrás)
<!-- /PRISMA:dashboard -->
```

### Métricas de Performance
```markdown
<!-- PRISMA:metricas coleta="tempo-real" -->
**Performance da API** (últimas 24h):
- Latência média: 234ms (meta: < 300ms) ✅
- Taxa de erro: 0.12% (meta: < 0.5%) ✅
- Throughput: 1,245 req/min
- Uptime: 99.94%

**Build Pipeline**:
- Tempo médio: 4m 32s
- Taxa de sucesso: 94.2%
- Deploys hoje: 12

**Qualidade do Código**:
- Cobertura tendência: 📈 +2.3% (semana)
- Complexidade: 📊 Estável
- Debt ratio: 📉 -0.8% (mês)
<!-- /PRISMA:metricas -->
```

## 🔧 Exemplos de Debug e Troubleshooting

### Debug de Testes
```markdown
<!-- PRISMA:teste debug="verbose" -->
```typescript
// Teste com debug detalhado
function processarPedido(pedido: Pedido): ResultadoPedido {
  console.log("🔍 Processando pedido:", pedido.id)

  const validacao = validarPedido(pedido)
  console.log("✅ Validação:", validacao)

  const calculo = calcularTotal(pedido)
  console.log("💰 Cálculo:", calculo)

  const resultado = finalizarPedido(pedido, calculo)
  console.log("🎉 Resultado final:", resultado)

  return resultado
}

// PRISMA:expect
const pedidoTeste = { id: "123", items: [...] }
const resultado = processarPedido(pedidoTeste)
expect(resultado.status).toBe('processado')
expect(resultado.total).toBeGreaterThan(0)
```
<!-- /PRISMA:teste -->
```

### Debug de Workflows
```markdown
<!-- PRISMA:workflow nome="debug-deployment" debug="true" -->
**Problema**: Deploy falhando inconsistentemente

## Coleta de Informações
<!-- PRISMA:agente type="dev" debug="true" -->
*coletar-logs "últimos 10 deploys"
*analisar-padroes "falhas vs sucessos"
*verificar-ambiente "diferenças de configuração"

**Debug Output**:
- Logs coletados: ✅
- Padrão identificado: Falha em 30% dos deploys às sextas
- Suspeita: Load balancer com timeout baixo
<!-- /PRISMA:agente -->

## Teste de Hipótese
<!-- PRISMA:comando debug="true" -->
```bash
# Testar timeout do load balancer
curl -w "%{time_total}" -o /dev/null -s http://api.example.com/health
# Resultado: 2.5s (acima do timeout de 2s do LB)
```
<!-- /PRISMA:comando -->
<!-- /PRISMA:workflow -->
```

## 🎯 Templates Reutilizáveis

### Template de Feature
```markdown
<!-- PRISMA:template nome="nova-feature" -->
# Template: Nova Feature

**Parâmetros**:
- `{nome}`: Nome da feature
- `{complexidade}`: baixa|média|alta
- `{agentes}`: Lista de agentes envolvidos

## Planejamento
<!-- PRISMA:agente type="pm" -->
*definir-requisitos "{nome}"
*estimar-esforco "complexidade {complexidade}"
<!-- /PRISMA:agente -->

## Implementação
{{#if (eq complexidade "alta")}}
<!-- PRISMA:agente type="arquiteto" -->
*revisar-arquitetura "{nome}"
*criar-adr "decisões técnicas"
<!-- /PRISMA:agente -->
{{/if}}

<!-- PRISMA:agente type="dev" -->
*implementar-feature "{nome}"
*criar-testes "unitários e integração"
<!-- /PRISMA:agente -->

## Validação
<!-- PRISMA:agente type="qa" -->
*review-completo "{nome}"
*gate-qualidade "critérios aprovação"
<!-- /PRISMA:agente -->

<!-- PRISMA:teste -->
```typescript
// Template de teste para {nome}
describe('{nome}', () => {
  it('deve atender aos requisitos básicos', () => {
    // PRISMA:expect
    expect(true).toBe(true) // Substituir por teste real
  })
})
```
<!-- /PRISMA:teste -->
<!-- /PRISMA:template -->
```

### Uso do Template
```markdown
<!-- PRISMA:usar-template nome="nova-feature" -->
nome: "sistema-notificacoes"
complexidade: "média"
agentes: ["pm", "dev", "qa"]
<!-- /PRISMA:usar-template -->
```

## 🚦 Estados e Triggers

### Estados de Documentação
```markdown
<!-- PRISMA:estado inicial="rascunho" -->
**Estados possíveis**:
- `rascunho`: Documentação em criação
- `review`: Aguardando revisão
- `válida`: Pronta para uso
- `desatualizada`: Precisa atualização

**Transições automáticas**:
- Todos os testes passando → `válida`
- Código alterado → `desatualizada`
- Falha em teste → `review`
<!-- /PRISMA:estado -->
```

### Triggers Automáticos
```markdown
<!-- PRISMA:trigger evento="codigo-alterado" -->
**Quando**: Código relacionado for alterado
**Ação**: Revalidar automaticamente esta documentação

<!-- PRISMA:agente type="qa" -->
*validar-exemplos "neste documento"
*atualizar-se "exemplos desatualizados"
<!-- /PRISMA:agente -->
<!-- /PRISMA:trigger -->

<!-- PRISMA:trigger evento="deploy-producao" -->
**Quando**: Deploy em produção for realizado
**Ação**: Atualizar métricas e exemplos

<!-- PRISMA:comando -->
```bash
# Coletar métricas pós-deploy
curl -s http://api.example.com/metrics | jq '.performance'
```
<!-- /PRISMA:comando -->
<!-- /PRISMA:trigger -->
```

---

*Exemplos de Markdown Executável - PRISMA Framework*
*Documentação que funciona, valida e evolui automaticamente*
*Versão 1.0*