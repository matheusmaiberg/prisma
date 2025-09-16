# Story: Criar Configuração de Mapeamento

## 📋 Informações da Story
**Epic**: Mapeamento e Configuração Base
**Prioridade**: P0 - Crítica
**Estimativa**: 3 pontos
**Sprint**: 1
**Dependências**: Nenhuma (primeira story)

---

## História de Usuário

**Como** desenvolvedor migrando de BMAD para PRISMA
**Quero** ter um arquivo central de mapeamento de traduções
**Para** que o adaptador possa converter comandos automaticamente

## Contexto Completo

### Situação Atual
- Sistema BMAD em inglês em `.bmad-core/`
- Sistema PRISMA planejado em português
- Nenhum mapeamento existe atualmente
- Usuários usam comandos como `*agent dev`

### Objetivo
Criar arquivo `config/mapeamento.yaml` com todas traduções necessárias para o adaptador funcionar.

## Critérios de Aceitação

- [ ] Arquivo `config/mapeamento.yaml` criado
- [ ] Mapeamento de todos 9 agentes BMAD → PRISMA
- [ ] Mapeamento de comandos básicos (help, status, exit, etc.)
- [ ] Mapeamento de workflows (greenfield→nascente, brownfield→existente)
- [ ] Suporte a aliases (dev→desenvolvedor, developer→desenvolvedor)
- [ ] Arquivo validável por YAML parser
- [ ] Documentação inline explicando cada seção

## Especificação Técnica

### Estrutura do Arquivo
```yaml
versao: 1.0.0
idioma_origem: en
idioma_destino: pt-BR

agentes:
  mapeamento_direto:
    bmad-orchestrator: orquestrador
    analyst: analista
    architect: arquiteto
    dev: desenvolvedor
    pm: gerente-projeto
    po: product-owner
    qa: qualidade
    sm: scrum-master
    ux-expert: especialista-ux

  aliases:
    developer: desenvolvedor
    project-manager: gerente-projeto

comandos:
  basicos:
    help: ajuda
    status: estado
    exit: sair

  acoes:
    agent: agente
    task: tarefa
    workflow: fluxo
```

### Validações Necessárias
1. Todos agentes BMAD devem ter tradução
2. Nenhuma tradução duplicada
3. Formato YAML válido
4. Encoding UTF-8 para caracteres PT-BR

## Tarefas de Implementação

1. **Criar estrutura de diretório**
   ```bash
   mkdir -p config
   ```

2. **Criar arquivo base**
   - Implementar estrutura YAML completa
   - Adicionar todos mapeamentos conhecidos
   - Incluir comentários explicativos

3. **Validar arquivo**
   - Testar parse YAML
   - Verificar duplicações
   - Confirmar encoding

4. **Criar loader**
   - Função para carregar mapeamento
   - Cache em memória
   - Reload automático se modificado

## Definição de Pronto

- [x] Arquivo criado e validado
- [x] Todos mapeamentos incluídos
- [x] Testes unitários para loader
- [x] Documentação atualizada
- [x] Code review aprovado
- [x] Merge para branch principal

## Notas Adicionais

- Este é o fundamento para todo o adaptador
- Mudanças futuras devem ser versionadas
- Considerar criar schema JSON para validação
- Manter backup do mapeamento

---
*Story fragmentada do PRD principal*
*Última atualização: 2025-09-16*