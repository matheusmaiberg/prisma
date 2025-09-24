# Guia de Uso do Universal Agent Framework (PRISMA)

## 🎯 O que é o Universal Agent Framework

O Universal Agent Framework (PRISMA) é um sistema de **documentação viva executável** que transforma markdown em workflows inteligentes. O framework permite que você:

- **Execute documentação**: Seus exemplos de código são testados automaticamente
- **Orquestre agentes**: Coordene múltiplos agentes especializados através de markdown
- **Valide conteúdo**: Links, comandos e pré-requisitos são verificados em tempo real
- **Mantenha sincronia**: Documentação sempre atualizada com o código

## 📋 Conceitos Fundamentais

### Documentação Viva
```markdown
<!-- Este não é apenas um exemplo - é código executável -->
<!-- PRISMA:teste -->
```typescript
function somar(a: number, b: number): number {
  return a + b
}

// PRISMA:expect
somar(2, 3) // => 5
```
<!-- /PRISMA:teste -->
```

### Orquestração de Agentes
```markdown
<!-- PRISMA:workflow -->
**Tarefa**: Implementar sistema de autenticação

**Pipeline**:
1. `*pm` - Definir requisitos de segurança
2. `*arquiteto` - Desenhar arquitetura JWT
3. `*dev` - Implementar endpoints
4. `*qa` - Criar testes de segurança
<!-- /PRISMA:workflow -->
```

### Comandos Executáveis
```markdown
<!-- PRISMA:comando -->
```bash
npm install prisma-framework
# Output esperado: "✅ PRISMA Framework instalado com sucesso"
```
<!-- /PRISMA:comando -->
```

## 🚀 Como Usar o Framework

### 1. Inicializando o PRISMA
```markdown
# No seu documento markdown, adicione:

<!-- PRISMA:iniciar -->
Sistema: Sistema de Blog
Agentes: [diretor, dev, qa, pm]
Modo: desenvolvimento
<!-- /PRISMA:iniciar -->

# Agora você pode usar comandos PRISMA
```

### 2. Comandos de Agentes

#### Comando Diretor (Orquestrador Principal)
```markdown
<!-- PRISMA:diretor -->
*iniciar

*fazer "criar página de login"

*analisar progresso do projeto
<!-- /PRISMA:diretor -->
```

#### Comandos Especializados
```markdown
<!-- PRISMA:agente type="dev" -->
*implementar "componente de busca"

*executar testes unitários

*debug "problema de performance"
<!-- /PRISMA:agente -->

<!-- PRISMA:agente type="qa" -->
*risk análise da funcionalidade de pagamento

*review código de autenticação

*gate validação antes do deploy
<!-- /PRISMA:agente -->

<!-- PRISMA:agente type="pm" -->
*validar-historia "cadastro de usuários"

*priorizar-backlog sprint atual

*refinar-requisitos "sistema de notificações"
<!-- /PRISMA:agente -->
```

### 3. Workflows Complexos
```markdown
<!-- PRISMA:workflow nome="feature-completa" -->
**Objetivo**: Implementar funcionalidade completa

**Etapas**:
1. **Planejamento** (Paralelo)
   - `*pm` definir requisitos
   - `*arquiteto` analisar impacto técnico

2. **Desenvolvimento** (Sequencial)
   - `*dev` implementar funcionalidade
   - `*qa` executar testes

3. **Validação** (Quality Gate)
   - `*qa` *gate decisão final
   - `*pm` validar valor entregue

**Critérios de Sucesso**:
- Todos os testes passando
- Cobertura mínima de 80%
- Performance dentro dos SLAs
<!-- /PRISMA:workflow -->
```

## 📝 Sintaxe de Markdown Executável

### Blocos de Código Testáveis
```markdown
<!-- PRISMA:teste linguagem="typescript" -->
```typescript
interface User {
  id: string;
  email: string;
}

function createUser(email: string): User {
  return {
    id: generateId(),
    email
  }
}

// PRISMA:expect
const user = createUser("test@example.com")
expect(user.email).toBe("test@example.com")
expect(user.id).toBeDefined()
```
<!-- /PRISMA:teste -->
```

### Links Auto-Verificados
```markdown
<!-- PRISMA:link -->
Veja mais detalhes na [documentação da API](./api-reference.md#authentication)
<!-- /PRISMA:link -->

<!-- PRISMA:link externo="true" -->
Baseado na [especificação JWT](https://jwt.io/introduction/)
<!-- /PRISMA:link -->
```

### Comandos com Validação
```markdown
<!-- PRISMA:comando ambiente="development" -->
```bash
npm run build
# Output esperado: "Build completed successfully"
# Falha se: contém "error" ou "failed"
```
<!-- /PRISMA:comando -->
```

### Pré-requisitos Verificados
```markdown
<!-- PRISMA:requisitos -->
**Sistema**:
- Node.js >= 18.0.0
- npm >= 8.0.0
- TypeScript >= 4.9.0

**Variáveis de Ambiente**:
- `DATABASE_URL` (obrigatória)
- `JWT_SECRET` (obrigatória)
- `NODE_ENV` (opcional, padrão: development)

**Portas**:
- 3000 (API)
- 5432 (PostgreSQL)
<!-- /PRISMA:requisitos -->
```

## 🔄 Padrões de Uso

### Padrão 1: Feature Development
```markdown
# Implementar Sistema de Comentários

<!-- PRISMA:workflow nome="comentarios" -->
**Contexto**: Blog precisa de sistema de comentários

**Agentes Envolvidos**:
- `*diretor` - Coordenação geral
- `*pm` - Requisitos e validação
- `*dev` - Implementação
- `*qa` - Qualidade e testes

**Pipeline**:

## Fase 1: Planejamento
<!-- PRISMA:agente type="pm" -->
*validar-requisitos "sistema de comentários com moderação"
<!-- /PRISMA:agente -->

## Fase 2: Implementação
<!-- PRISMA:agente type="dev" -->
*implementar-feature "API de comentários"
*implementar-feature "Interface de comentários"
*implementar-feature "Sistema de moderação"
<!-- /PRISMA:agente -->

## Fase 3: Validação
<!-- PRISMA:agente type="qa" -->
*risk sistema de comentários
*review implementação completa
*gate validação final
<!-- /PRISMA:agente -->
<!-- /PRISMA:workflow -->

<!-- PRISMA:teste -->
```typescript
// Teste do modelo de comentário
interface Comment {
  id: string;
  content: string;
  authorId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

// PRISMA:expect
const comment: Comment = createComment("Ótimo artigo!")
expect(comment.status).toBe('pending')
expect(comment.content).toBe('Ótimo artigo!')
```
<!-- /PRISMA:teste -->
```

### Padrão 2: Bug Investigation
```markdown
# Investigação: Lentidão no Login

<!-- PRISMA:workflow nome="debug-performance" -->
**Problema**: Login demorando mais de 5 segundos

## Análise Inicial
<!-- PRISMA:agente type="qa" -->
*risk análise de performance do login
<!-- /PRISMA:agente -->

## Investigação
<!-- PRISMA:agente type="dev" -->
*debug "performance do endpoint /auth/login"
*analisar "queries do banco de dados"
<!-- /PRISMA:agente -->

## Validação da Correção
<!-- PRISMA:comando -->
```bash
# Teste de carga
ab -n 100 -c 10 http://localhost:3000/auth/login
# Tempo médio esperado: < 1 segundo
```
<!-- /PRISMA:comando -->
<!-- /PRISMA:workflow -->
```

### Padrão 3: Code Review
```markdown
# Review: Pull Request #123

<!-- PRISMA:agente type="qa" -->
*review "implementação de cache Redis"

**Critérios**:
- Padrões de código seguidos
- Testes adequados
- Documentação atualizada
- Performance dentro dos SLAs
<!-- /PRISMA:agente -->

<!-- PRISMA:teste -->
```typescript
// Validar implementação do cache
const cache = new RedisCache()

// PRISMA:expect
await cache.set('user:123', userData)
const retrieved = await cache.get('user:123')
expect(retrieved).toEqual(userData)
```
<!-- /PRISMA:teste -->
```

## 🎮 Comandos Interativos

### Comando de Status
```markdown
<!-- PRISMA:diretor -->
*status
<!-- /PRISMA:diretor -->

<!-- Resposta esperada:
📊 PRISMA Framework Status
━━━━━━━━━━━━━━━━━━━━━
✅ Documentos: 15 válidos, 2 atenção
🔄 Workflows ativos: 3
🧪 Testes: 98% passando
🔗 Links: todos válidos
⚠️  Atenção: 2 comandos com output alterado
-->
```

### Comando de Progresso
```markdown
<!-- PRISMA:diretor -->
*progresso
<!-- /PRISMA:diretor -->

<!-- Resposta esperada:
📈 Progresso do Projeto
━━━━━━━━━━━━━━━━━━━
🏁 Completas: 12 tarefas
🔄 Em andamento: 3 tarefas
⏸️  Pendentes: 7 tarefas
🚫 Bloqueadas: 1 tarefa

Próximos passos sugeridos:
1. Implementar testes da API
2. Atualizar documentação
3. Resolver dependência bloqueada
-->
```

### Comando de Recomendações
```markdown
<!-- PRISMA:diretor -->
*recomendar
<!-- /PRISMA:diretor -->

<!-- Resposta baseada no contexto atual:
💡 Recomendações Inteligentes
━━━━━━━━━━━━━━━━━━━━━━━
1. 🧪 Adicionar testes para módulo auth (cobertura 65%)
2. 📚 Atualizar README.md (último update há 2 semanas)
3. 🔒 Implementar rate limiting (detectado endpoint público)
4. ⚡ Otimizar query lenta identificada em /users
-->
```

## 📊 Monitoramento e Métricas

### Dashboard de Saúde
```markdown
<!-- PRISMA:dashboard -->
## Dashboard do Projeto

**Status Geral**: 🟢 Saudável (94%)

**Métricas de Qualidade**:
- Testes: 98% passando (196/200)
- Cobertura: 85% (meta: 80%)
- Lint: 100% sem erros
- Links: 100% válidos

**Workflows**:
- ✅ feature-login: Completo
- 🔄 feature-comments: 60% (fase implementação)
- ⏸️  feature-admin: Aguardando requisitos

**Alertas**:
- ⚠️  Query lenta detectada em `/api/users`
- 💡 Sugestão: Implementar cache Redis
<!-- /PRISMA:dashboard -->
```

### Métricas de Desenvolvimento
```markdown
<!-- PRISMA:metricas -->
**Velocidade**:
- Commits/dia: 8.5 (tendência ↗️)
- Features/sprint: 3.2
- Tempo médio por feature: 2.3 dias

**Qualidade**:
- Bugs/feature: 0.8 (meta: < 1)
- Tempo de correção: 4.2h (média)
- Retrabalho: 12% (meta: < 15%)

**Satisfação**:
- Dev experience: 4.6/5
- Code review speed: 2.1h média
- Deploy frequency: 2x/dia
<!-- /PRISMA:metricas -->
```

## 🔧 Troubleshooting

### Problema: Comando não executando
```markdown
<!-- PRISMA:debug -->
**Sintomas**: Comando PRISMA não responde

**Checklist**:
- [ ] Sintaxe do bloco correta
- [ ] Agente especificado existe
- [ ] Permissões de execução
- [ ] Dependências instaladas

**Solução**:
<!-- PRISMA:comando -->
```bash
# Verificar status do PRISMA
prisma-framework --status
# Reinicializar se necessário
prisma-framework --restart
```
<!-- /PRISMA:comando -->
<!-- /PRISMA:debug -->
```

### Problema: Teste falhando
```markdown
<!-- PRISMA:debug -->
**Sintomas**: Teste executável falhando

**Investigação**:
<!-- PRISMA:teste debug="true" -->
```typescript
// Teste com debug habilitado
console.log("Estado antes:", state)
const result = functionToTest()
console.log("Resultado:", result)
// PRISMA:expect
expect(result).toBe(expectedValue)
```
<!-- /PRISMA:teste -->
<!-- /PRISMA:debug -->
```

## ✨ Dicas Avançadas

### Tip 1: Workflows Condicionais
```markdown
<!-- PRISMA:workflow condicional="true" -->
**Se** cobertura de testes < 80%:
- `*dev` implementar testes faltantes
- `*qa` validar cobertura

**Senão**:
- `*qa` *gate aprovação automática
<!-- /PRISMA:workflow -->
```

### Tip 2: Parallelização Inteligente
```markdown
<!-- PRISMA:agente paralelo="true" -->
Executar simultaneamente:
- `*dev` implementar frontend
- `*dev` implementar backend
- `*qa` preparar testes

Sincronizar após conclusão de todos
<!-- /PRISMA:agente -->
```

### Tip 3: Templates Reutilizáveis
```markdown
<!-- PRISMA:template nome="feature-standard" -->
**Template**: Feature Padrão

**Parâmetros**:
- `{feature_name}`: Nome da feature
- `{complexity}`: alta|média|baixa

**Pipeline**:
1. `*pm` validar requisitos de {feature_name}
2. Se {complexity} == "alta": `*arquiteto` review técnico
3. `*dev` implementar {feature_name}
4. `*qa` *review + *gate
<!-- /PRISMA:template -->

<!-- Uso do template: -->
<!-- PRISMA:usar template="feature-standard" feature_name="carrinho" complexity="média" -->
```

---

*Universal Agent Framework (PRISMA) - Documentação que executa, desenvolve e evolui*
*Versão 1.0*