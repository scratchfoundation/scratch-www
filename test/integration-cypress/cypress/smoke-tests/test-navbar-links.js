const baseUrl = Cypress.config('baseUrl');
const username = Cypress.env('USERNAME');
const password = Cypress.env('PASSWORD');

describe('test links in nav bar while signed out', function (){
    beforeEach(function (){
        cy.visit('');
    });

    it('click SCRATCH', function (){
        cy
            .get('.logo')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/');
    });

    it('click Create', function (){
        cy
            .get('.link.create')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/projects/editor/?tutorial=getStarted');
    });

    it('click Explore', function (){
        cy
            .get('.link.explore')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/explore/projects/all');
    });

    it('click Tips', function (){
        cy
            .get('.link.tips')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/tips');
    });

    it('click About', function (){
        cy
            .get('.link.about')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/about');
    });


    it('submit empty Search', function (){
        cy
            .get('.search .form')
            .submit();
        cy
            .url()
            .should('eq', baseUrl + '/search/projects?q=');
    });

    it('click Join Scratch', function (){
        cy
            .get('.link.right.join')
            .click();
        cy
            .get('.modal-content-iframe.mod-registration')
            .should('be.visible');
    });

    it('click Sign In', function (){
        cy
            .get('.link.right.login-item')
            .click();
        cy
            .get('.login')
            .should('be.visible');
    });


});

describe('test links in nav bar while signed in', function (){
    before(function (){
        cy
            .visit('');
        cy
            .get('.link.right.login-item')
            .click();
        cy
            .get('#frc-username-1088')
            .type(username);
        cy
            .get('#frc-password-1088')
            .type(password);
        cy
            .get('.button.submit-button.white')
            .click();
        cy
            .get('.profile-name')
            .should('be.visible');
        cy
            .visit('');
    });

    beforeEach(function (){
        Cypress.Cookies.preserveOnce('scratchsessionsid');
        cy
            .visit('');
    });

    it('click SCRATCH', function (){
        cy
            .get('.logo')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/');
    });

    it('click Create', function (){
        cy
            .get('.link.create')
            .click();
        cy
            .get('.container')
            .should('be.visible');
    });

    it('click Explore', function (){
        cy
            .get('.link.explore')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/explore/projects/all');
    });

    it('click Tips', function (){
        cy
            .get('.link.tips')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/tips');
    });

    it('click About', function (){
        cy
            .get('.link.about')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/about');
    });


    it('submit empty Search', function (){
        cy
            .get('.search .form')
            .submit();
        cy
            .url()
            .should('eq', baseUrl + '/search/projects?q=');
    });

    it('click Messages', function (){
        cy
            .get('.link.right.messages')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/messages/');
    });

    it('click My Stuff', function (){
        cy
            .get('.link.right.mystuff')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/mystuff/');
    });

});
