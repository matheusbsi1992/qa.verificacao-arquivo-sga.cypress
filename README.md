# Testes Automatizados - Validar Arquivo XLS - SGA (Sistema de Gerenciamento de Atendimento)

## Objetivo

Este repositório contém testes automatizados desenvolvidos com **Cypress**, utilizando arquivos `.cy.js`. Os testes foram criados com o intuito de **validar serviços, funcionalidades e fluxos críticos** da aplicação web SGA, garantindo a qualidade e confiabilidade do sistema através de automação.

## Estrutura de Pastas

```
cypress/
├── e2e/
│   └── sga/                  # Testes específicos do módulo SGA
│       └── relatorioatendimento.cy.js
├── support/                  # Configurações e utilitários
│   ├── helper.js             # Identificação de arquivo .xlsx/.xls e conversão para .json
│   
│
├── videos/sga                   # Gravações dos testes
├── cypress.config.js
└── downloads/                # Arquivos baixados durante execução

```

## Descrição dos Testes

### Pasta: `sga/`
Contém testes específicos para o módulo SGA (Sistema de Gerenciamento de Atendimento):
- **relatorioatendimento.cy.js** - Validação de relatórios de atendimento

## Como Executar

```bash
# Instalar dependências
npm install

# Executar todos os testes
npm run cypress:run

# Abrir Cypress Test Runner (interface gráfica)
npm run cypress:open

# Executar testes de uma pasta específica
npm run cypress:run -- --spec "cypress/e2e/estudos/**/*.cy.js"
npm run cypress:run -- --spec "cypress/e2e/sga/**/*.cy.js"

# Executar via GUI Cypress no Linux
xhost +local:$(whoami)
npx cypress open
```

## Tecnologias Utilizadas

- **Cypress** - Framework de automação de testes para aplicações web
- **JavaScript** - Linguagem de programação

## Padrão de Desenvolvimento

Todos os arquivos `.cy.js` seguem a estrutura padrão Cypress:
- Utilizam `describe()` para agrupar testes
- Utilizam `it()` para casos de teste individuais
- Implementam `beforeEach()` para configurações iniciais
- Usam seletores com `data-cy` para melhor rastreabilidade
- Aplicam asserções robustas com `.should()`

