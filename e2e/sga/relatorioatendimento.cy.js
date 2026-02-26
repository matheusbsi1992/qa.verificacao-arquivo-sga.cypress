describe('Baixar PDF', () => {

  beforeEach(() => {
    cy.viewport(1280, 900);
    // Configurações antes de cada teste, se necessário
  });

  it('Deve validar usuário inexistente', () => {
    // Ajuste a URL se necessário (usa baseUrl do cypress.config)
    cy.visit('http://192.168.1.101:8080/admin-starter/login.jsf');

    cy.get('#formlogin')
      .should('be.visible')
      .find('input[name="formlogin:usuario"]')
      .should('be.visible')
      .type('admin');

    cy.get('#formlogin')
      .should('be.visible')
      .find('input[name="formlogin:senha"]')
      .should('be.visible')
      .type('admin123');

    cy.contains('button', 'Entrar')
      .should('be.visible')
      .click();

    cy.get('.ui-growl-title')
      .should('be.visible')
      .and('have.text', 'USUÁRIO OU SENHA INVÁLIDOS');

  });

  it('Deve validar usuário existente', () => {
    // Ajuste a URL se necessário (usa baseUrl do cypress.config)
    cy.visit('http://192.168.1.101:8080/admin-starter/login.jsf');

    cy.get('#formlogin')
      .should('be.visible')
      .find('input[name="formlogin:usuario"]')
      .should('be.visible')
      .type('administrador');

    cy.get('#formlogin')
      .should('be.visible')
      .find('input[name="formlogin:senha"]')
      .should('be.visible')
      .type('$G4%(!=)live%');

    cy.contains('button', 'Entrar')
      .should('be.visible')
      .click();

    cy.get('#info-messages')
      .should('be.visible')
      .and('contain.text', 'Login realizado com sucesso ADMINISTRADOR');
  });

  it('Deve verificar o conteúdo da tabela de atendimento por status', () => {
    // Ajuste a URL se necessário (usa baseUrl do cypress.config)
    cy.visit('http://192.168.1.101:8080/admin-starter/login.jsf');

    cy.get('#formlogin')
      .should('be.visible')
      .find('input[name="formlogin:usuario"]')
      .should('be.visible')
      .type('administrador');

    cy.get('#formlogin')
      .should('be.visible')
      .find('input[name="formlogin:senha"]')
      .should('be.visible')
      .type('minha_senha');

    cy.contains('button', 'Entrar')
      .should('be.visible')
      .click();

    cy.get('#info-messages')
      .should('be.visible')
      .and('contain.text', 'Login realizado com sucesso ADMINISTRADOR');

    cy.contains('Estatísticas')
      .should('be.visible')
      .click();

    cy.contains('Gráficos')
      .should('be.visible')
      .click();

    cy.get('#grafico')
      .should('be.visible')
      .click();

    cy.get('#grafico_panel')
      .should('be.visible')
      .find('ul')
      .should('be.visible')
      .find('li')
      .contains('Atendimentos por Status')
      .should('be.visible')
      .click({ force: true });

    //-- selecionar data inicial
    cy.get('#datainiciografico_input')
      .should('be.visible')
      .clear()
      .type('01012023');

    //-- informar data final
    cy.get('#datafinalgrafico_input')
      .should('be.visible')
      .clear()
      .type('21112025');

    //-- clicar em gerar gráfico
    cy.contains('Gerar gráfico')
      .should('be.visible')
      .click();

    //-- validar exibição do gráfico
    cy.contains('GRÁFICO DE STATUS CONSULTADO COM SUCESSO!!!')
      .should('be.visible');

    //-- clicar em baixar PDF
    cy.wait(3000); // Espera para garantir que o gráfico foi gerado antes de visualizar os dados
    cy.get('#atendimentostatus')
      .should('be.visible')
      //.contains('path','highcharts-button-symbol')
      .find('.highcharts-button-symbol')
      .should('be.visible')
      .click();

    cy.contains('View data table')
      .should('be.visible')
      .click();

    cy.get('thead')
      .should('be.visible')
      .contains('Category')
      .as('colCategory');

    cy.get('thead')
      .should('be.visible')
      .contains('Atendimentos')
      .as('colAtendimentos');

    //-- capturar dados da tabela exibida

    cy.get('tbody')
      .should('be.visible')
      .within(() => {
        cy.get('tr').eq(1).within(() => {
          cy.get('th').eq(0).should('have.text', 'ATENDIMENTO NÃO ENCERRADO E NÃO CODIFICADO');
          cy.get('td').eq(0).should('have.text', '52');
        })
      });

    cy.get('tbody')
      .should('be.visible')
      .find('tr')
      .each(($tr, index) => {
        // para cada linha: pega a coluna th e a primeira td
        cy.wrap($tr)
          .find('th')
          .should('be.visible')
          .invoke('text')
          .then((categoria) => {
            cy.wrap($tr)
              .find('td')
              .eq(0)
              .invoke('text')
              .then((atendimentos) => {
                const cat = categoria.trim();
                const val = atendimentos.trim();
                // Exemplo: logar
                cy.log(`${index}: ${cat} => ${val}`);
                // Exemplo: afirmação condicional
                if (cat === 'ATENDIMENTO NÃO ENCERRADO E NÃO CODIFICADO') {
                  expect(val).to.equal('52');
                }
              });
          });
      });

  });

  it.only('Deve verificar o conteúdo do relatório de atendimento', () => {
    // Ajuste a URL se necessário (usa baseUrl do cypress.config)
    cy.visit('http://192.168.1.101:8080/admin-starter/login.jsf');

    cy.get('#formlogin')
      .should('be.visible')
      .find('input[name="formlogin:usuario"]')
      .should('be.visible')
      .type('administrador');

    cy.get('#formlogin')
      .should('be.visible')
      .find('input[name="formlogin:senha"]')
      .should('be.visible')
      .type('minha_senha');

    cy.contains('button', 'Entrar')
      .should('be.visible')
      .click();

    cy.get('#info-messages')
      .should('be.visible')
      .and('contain.text', 'Login realizado com sucesso ADMINISTRADOR');

    cy.contains('Estatísticas')
      .should('be.visible')
      .click();

    cy.contains('Relatórios')
      .should('be.visible')
      .click();

    cy.get('[id="formulariorelatorioestatisticas:relatorio"]')
      .should('be.visible')
      .click()
      //.wait(3000);

    cy.get('[id="formulariorelatorioestatisticas:relatorio_panel"]')
      .should('be.visible')
      .within(() => {
        cy.contains('li', 'Serviços Concluídos')
          .should('be.visible')
          .click();
      });

    //-- selecionar data inicial
    cy.get('[id="formulariorelatorioestatisticas:datainiciorelatorio"]')
      .should('be.visible')
      .clear()
      .type('01012023');

    //-- informar data final
    cy.get('[id="formulariorelatorioestatisticas:datafinalrelatorio_input"]')
      .should('be.visible')
      .clear()
      .type('21112025');

    //-- clicar em gerar gráfico
    cy.contains('Gerar relatório')
      .should('be.visible')
      .click();

    cy.get('[id="formulariorelatorioestatisticas:j_idt217"]')
      .parent()
      .should('be.visible')
      //.wait(5000)
      .click();

    //Serviços Concluídos

    cy.task("readExcel", "./cypress/downloads/Serviços Concluídos.xls")
      .then((rows) => {
      
        // Validar conteúdo
        expect(rows[0].Serviço).to.equal('COLONOSCOPIA HAPVIDA');
        expect(rows[0].Senha).to.equal('PCOLOHAPVIDA5');

      });

      cy.task("readExcel", "./cypress/downloads/Serviços Concluídos.xls")
      .then((rows) => {
        cy.log('Dados lidos do Excel:')
        //.wait(3000);
        cy.log(JSON.stringify(rows, null, 2));
      });

    // cy.task('readPDF','./cypress/downloads/Serviços Concluídos.pdf')
    // .should('exist')
    // .should('contain', 'Senha')
    // .then(function(pdfData) {
    //   const pdfText = pdfData.text;
    //   cy.log('Conteúdo do PDF:', pdfText)
    //   cy.wrap(pdfText).should('contain', 'Tempo de Espera');
    //   //return pdfText;
    // });


    // cy.task('readPDF', './cypress/downloads/Serviços Concluídos.pdf')
    //   .then(console.log)
    //         .then((text) => {
    //             //expect(text).to.include('Bem-vindo ao Smallpdf');
    //             cy.log(text.text);
    //             cy.log('Texto extraído do PDF: ' + text.text);

    //             cy.log('Validação concluída com sucesso!');
    //             cy.log('Texto completo do PDF: ' + text.text);
    //         });
    //.as('pdfText');
    //.should('exist')
    //.and('contain', 'Senha');
    // .and((pdfText) => {
    //     expect(pdfText).to.include('Senha');
    //     //expect(pdfText).to.include('Período: 01/01/2023 a 21/11/2025');
    // });


  });
});