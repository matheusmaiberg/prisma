# Componente: Geração de Código

## Capacidade de Geração Automática de Código

### Templates Disponíveis

#### React Component
```javascript
// Template: Componente React
import React from 'react';
import PropTypes from 'prop-types';
import './${nome}.css';

const ${Nome} = ({ ${props} }) => {
  return (
    <div className="${nome}-container">
      {/* Implementação aqui */}
    </div>
  );
};

${Nome}.propTypes = {
  ${propTypes}
};

${Nome}.defaultProps = {
  ${defaultProps}
};

export default ${Nome};
```

#### API Service
```javascript
// Template: Serviço API
class ${Nome}Service {
  constructor(httpClient) {
    this.http = httpClient;
    this.baseUrl = '/api/${recurso}';
  }

  async listar(filtros = {}) {
    return this.http.get(this.baseUrl, { params: filtros });
  }

  async obter(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  async criar(dados) {
    return this.http.post(this.baseUrl, dados);
  }

  async atualizar(id, dados) {
    return this.http.put(`${this.baseUrl}/${id}`, dados);
  }

  async deletar(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

export default ${Nome}Service;
```

#### Unit Test
```javascript
// Template: Teste Unitário
import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import ${Nome} from './${arquivo}';

describe('${Nome}', () => {
  let instance;

  beforeEach(() => {
    // Setup
    instance = new ${Nome}();
  });

  describe('${metodo}', () => {
    test('deve ${comportamento} quando ${condicao}', () => {
      // Arrange
      const entrada = ${entrada};
      const esperado = ${esperado};

      // Act
      const resultado = instance.${metodo}(entrada);

      // Assert
      expect(resultado).toBe(esperado);
    });

    test('deve lançar erro quando ${condicaoErro}', () => {
      // Arrange
      const entradaInvalida = ${entradaInvalida};

      // Act & Assert
      expect(() => {
        instance.${metodo}(entradaInvalida);
      }).toThrow(${erroEsperado});
    });
  });
});
```

### Processo de Geração

```javascript
function gerarCodigo(tipo, nome, opcoes = {}) {
  // 1. Validar entrada
  if (!tipo || !nome) {
    throw new Error('Tipo e nome são obrigatórios');
  }

  // 2. Selecionar template
  const template = obterTemplate(tipo);
  if (!template) {
    throw new Error(`Template '${tipo}' não encontrado`);
  }

  // 3. Preparar variáveis
  const variaveis = {
    nome: kebabCase(nome),
    Nome: pascalCase(nome),
    NOME: upperSnakeCase(nome),
    ...opcoes
  };

  // 4. Processar template
  let codigo = template;
  for (const [chave, valor] of Object.entries(variaveis)) {
    codigo = codigo.replace(new RegExp(`\\$\\{${chave}\\}`, 'g'), valor);
  }

  // 5. Formatar código
  codigo = formatar(codigo, opcoes.linguagem || 'javascript');

  // 6. Salvar arquivo
  const caminho = definirCaminho(tipo, nome);
  salvarArquivo(caminho, codigo);

  // 7. Gerar teste se solicitado
  if (opcoes.comTeste) {
    gerarTeste(tipo, nome);
  }

  return {
    sucesso: true,
    arquivo: caminho,
    linhas: codigo.split('\n').length
  };
}
```

### Tipos Suportados

| Tipo | Descrição | Arquivos Gerados |
|------|-----------|------------------|
| componente | React component | .jsx, .css, .test.js |
| servico | API service | .js, .test.js |
| modelo | Data model | .js, .d.ts |
| teste | Test suite | .test.js |
| mock | Mock data | .mock.js |
| hook | React hook | .js, .test.js |
| contexto | React context | .jsx, .test.js |
| reducer | Redux reducer | .js, .test.js |
| action | Redux action | .js |
| middleware | Express middleware | .js, .test.js |

### Helpers de Formatação

```javascript
// Conversões de nome
const kebabCase = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const camelCase = (str) => str.replace(/-./g, x => x[1].toUpperCase());
const pascalCase = (str) => camelCase(str).replace(/^./, x => x.toUpperCase());
const upperSnakeCase = (str) => kebabCase(str).replace(/-/g, '_').toUpperCase();

// Formatação de código
const formatar = (codigo, linguagem) => {
  switch(linguagem) {
    case 'javascript':
    case 'typescript':
      return prettierFormat(codigo);
    case 'python':
      return blackFormat(codigo);
    case 'java':
      return googleJavaFormat(codigo);
    default:
      return codigo;
  }
};
```

### Validações

```javascript
function validarNome(nome) {
  // Não pode começar com número
  if (/^\d/.test(nome)) {
    throw new Error('Nome não pode começar com número');
  }

  // Apenas letras, números, - e _
  if (!/^[a-zA-Z0-9-_]+$/.test(nome)) {
    throw new Error('Nome contém caracteres inválidos');
  }

  // Tamanho razoável
  if (nome.length < 2 || nome.length > 50) {
    throw new Error('Nome deve ter entre 2 e 50 caracteres');
  }

  return true;
}
```

### Integração com Sistema

```javascript
// Registrar no desenvolvedor
desenvolvedor.registrarComando('gerar', async (tipo, nome, opcoes) => {
  console.log(`🔧 Gerando ${tipo}: ${nome}...`);

  try {
    const resultado = await gerarCodigo(tipo, nome, opcoes);
    console.log(`✅ Gerado: ${resultado.arquivo} (${resultado.linhas} linhas)`);

    // Atualizar story file list
    if (story.atual) {
      story.adicionarArquivo(resultado.arquivo, 'criado');
    }

    return resultado;
  } catch (erro) {
    console.error(`❌ Erro ao gerar: ${erro.message}`);
    throw erro;
  }
});
```

### Exemplos de Uso

```bash
# Gerar componente React
gerar componente UserCard

# Gerar com teste
gerar servico AuthService --com-teste

# Gerar modelo tipado
gerar modelo User --typescript

# Gerar hook customizado
gerar hook useAuth

# Gerar middleware
gerar middleware authentication
```

---

**Componente de Geração de Código - Acelerando desenvolvimento com templates inteligentes!**