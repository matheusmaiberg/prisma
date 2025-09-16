# Base Agente - Componente Compartilhado

## Comportamentos Base para Todos Agentes PRISMA

Este componente define comportamentos e funcionalidades compartilhadas por todos os agentes do sistema PRISMA.

---

## Estrutura Base

### Identificação Obrigatória
Todo agente deve ter:
- **Nome**: Nome legível em português
- **ID**: Identificador único lowercase
- **Versão**: Versionamento semântico
- **Compatível com**: ID do agente BMAD equivalente

### Ativação Padrão
Todo agente responde a:
1. `/prisma agente [id]` - Comando PRISMA completo
2. `*agent [bmad-id]` - Comando BMAD retrocompatível
3. `@[id]` - Atalho direto

---

## Comandos Base Herdados

### Comandos Universais
Todos agentes herdam automaticamente:

| Comando | Aliases | Descrição |
|---------|---------|-----------|
| `ajuda` | help, h, ? | Mostra comandos do agente |
| `estado` | status, s | Estado atual do agente |
| `limpar` | clear, cls | Limpa contexto |
| `historico` | history, hist | Mostra histórico de comandos |
| `sair` | exit, quit, q | Retorna ao orquestrador |
| `versao` | version, v | Mostra versão do agente |

### Tratamento de Erros
```javascript
function tratarErroBase(erro) {
  const mensagens = {
    'COMANDO_NAO_ENCONTRADO': 'Comando não reconhecido. Digite "ajuda" para ver opções.',
    'PARAMETRO_FALTANTE': 'Este comando requer parâmetros adicionais.',
    'PERMISSAO_NEGADA': 'Você não tem permissão para esta ação.',
    'TIMEOUT': 'Operação excedeu o tempo limite.',
    'ERRO_INTERNO': 'Erro interno. Por favor, tente novamente.'
  };

  return mensagens[erro.tipo] || 'Erro desconhecido. Contate o suporte.';
}
```

---

## Ciclo de Vida do Agente

### 1. Ativação
```javascript
onAtivacao() {
  // Carrega configuração
  this.config = carregarConfig();

  // Inicializa estado
  this.estado = {
    ativo: true,
    iniciadoEm: Date.now(),
    comandosExecutados: 0
  };

  // Mostra saudação
  this.saudar();

  // Registra métricas
  this.registrarEvento('agente_ativado');
}
```

### 2. Processamento de Comando
```javascript
processarComando(comando) {
  try {
    // Valida comando
    this.validar(comando);

    // Registra no histórico
    this.historico.adicionar(comando);

    // Executa
    const resultado = this.executar(comando);

    // Atualiza estado
    this.estado.comandosExecutados++;

    // Retorna resultado
    return this.formatar(resultado);

  } catch (erro) {
    return this.tratarErro(erro);
  }
}
```

### 3. Transformação
```javascript
transformarPara(outroAgente) {
  // Preserva contexto
  const contexto = this.obterContexto();

  // Finaliza agente atual
  this.finalizar();

  // Ativa novo agente com contexto
  return ativarAgente(outroAgente, contexto);
}
```

### 4. Finalização
```javascript
onFinalizacao() {
  // Salva estado
  this.salvarEstado();

  // Registra métricas
  this.registrarEvento('agente_finalizado', {
    duracao: Date.now() - this.estado.iniciadoEm,
    comandos: this.estado.comandosExecutados
  });

  // Limpa recursos
  this.limparRecursos();
}
```

---

## Padrões de Resposta

### Formato de Sucesso
```markdown
✅ **[Ação Realizada]**

[Detalhes da ação]

📋 Próximos passos:
1. [Sugestão 1]
2. [Sugestão 2]
```

### Formato de Erro
```markdown
❌ **Erro: [Tipo do Erro]**

[Descrição do problema]

💡 Sugestão:
[Como resolver]

📚 Documentação: [link]
```

### Formato de Informação
```markdown
ℹ️ **[Título da Informação]**

[Conteúdo informativo]

🔍 Saiba mais: [comando ou link]
```

---

## Validações Base

### Validação de Comando
```javascript
validarComando(comando) {
  // Verifica se comando existe
  if (!this.comandos[comando.nome]) {
    throw new ComandoNaoEncontrado(comando.nome);
  }

  // Valida parâmetros obrigatórios
  const def = this.comandos[comando.nome];
  if (def.parametrosObrigatorios) {
    for (const param of def.parametrosObrigatorios) {
      if (!comando.parametros[param]) {
        throw new ParametroFaltante(param);
      }
    }
  }

  // Valida tipos
  this.validarTipos(comando.parametros, def.tipos);

  return true;
}
```

### Validação de Estado
```javascript
validarEstado() {
  // Verifica se agente está ativo
  if (!this.estado.ativo) {
    throw new AgenteInativo();
  }

  // Verifica timeout de sessão
  const agora = Date.now();
  const tempoInativo = agora - this.estado.ultimaAtividade;

  if (tempoInativo > this.config.timeoutSessao) {
    throw new SessaoExpirada();
  }

  return true;
}
```

---

## Logging e Métricas

### Níveis de Log
```javascript
const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  FATAL: 4
};

function log(nivel, mensagem, dados = {}) {
  const evento = {
    timestamp: new Date().toISOString(),
    agente: this.id,
    nivel: LogLevel[nivel],
    mensagem,
    ...dados
  };

  // Envia para sistema de logging
  logger.log(evento);

  // Console em desenvolvimento
  if (isDevelopment()) {
    console.log(`[${this.id}] ${mensagem}`, dados);
  }
}
```

### Eventos Rastreados
- `agente_ativado`
- `comando_executado`
- `erro_ocorrido`
- `transformacao_realizada`
- `agente_finalizado`

---

## Formatação e Output

### Helpers de Formatação
```javascript
// Tabela
function tabela(dados, colunas) {
  // Implementação de tabela ASCII/Markdown
}

// Lista numerada
function listaNumerada(itens) {
  return itens.map((item, i) => `${i + 1}. ${item}`).join('\n');
}

// Código
function bloco(codigo, linguagem = '') {
  return '```' + linguagem + '\n' + codigo + '\n```';
}

// Destaque
function destaque(texto) {
  return `**${texto}**`;
}
```

---

## Integração com Sistema

### Acesso a Recursos
```javascript
class RecursosBase {
  // Acesso ao sistema de arquivos
  async lerArquivo(caminho) {
    return await sistema.fs.ler(caminho);
  }

  // Acesso a banco de dados
  async consultar(query) {
    return await sistema.db.executar(query);
  }

  // Acesso a APIs
  async chamarAPI(endpoint, dados) {
    return await sistema.api.post(endpoint, dados);
  }

  // Cache compartilhado
  async cache(chave, valor) {
    if (valor === undefined) {
      return await sistema.cache.get(chave);
    }
    return await sistema.cache.set(chave, valor);
  }
}
```

---

## Segurança

### Validações de Segurança
```javascript
function validarSeguranca(entrada) {
  // Previne injeção
  const padraoPerigoso = /[;<>&|`$]/;
  if (padraoPerigoso.test(entrada)) {
    throw new EntradaPerigosa();
  }

  // Limita tamanho
  if (entrada.length > 1000) {
    throw new EntradaMuitoGrande();
  }

  // Sanitiza
  return entrada.trim().replace(/\s+/g, ' ');
}
```

---

## Extensibilidade

### Como Estender
Agentes específicos podem sobrescrever qualquer método base:

```javascript
class AgenteEspecifico extends BaseAgente {
  // Sobrescreve saudação
  saudar() {
    return "Saudação customizada do agente específico";
  }

  // Adiciona comandos
  constructor() {
    super();
    this.comandos.meuComando = {
      handler: this.executarMeuComando,
      descricao: "Comando específico"
    };
  }
}
```

---

**Este componente base garante consistência e reusabilidade em todos agentes PRISMA!**