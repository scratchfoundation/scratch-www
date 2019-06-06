const baseUrl = Cypress.config('baseUrl');

describe('test About links in footer', function () {
    beforeEach(function (){
        cy.visit('/');

    });

    after(function (){
    // this is here to fix the problem with the statistics page causing
    // the next test to fail.  Since it is a before each it makes the rest
    // of all the tests fail.  If it happens in an after, the beforeEach is fine
        cy.visit('/');
    });

    it('click About Scratch', function (){
        cy
            .get('.lists :first-child :nth-child(2) :first-child :first-child')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/about');
    });

    it('click For Parents', function (){
        cy
            .get('.lists :first-child :nth-child(3) :first-child :first-child')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/parents/');
    });

    it('click For Educators', function (){
        cy
            .get('.lists :first-child :nth-child(4) :first-child :first-child')
            .click();

        cy
            .url()
            .should('eq', baseUrl + '/educators');
    });

    it('click For Developers', function (){
        cy
            .get('.lists :first-child :nth-child(5) :first-child :first-child')
            .click();

        cy
            .url()
            .should('eq', baseUrl + '/developers');
    });

    it('click Credits', function (){
        cy
            .get('.lists :first-child :nth-child(6) :first-child :first-child')
            .click();

        cy
            .url()
            .should('eq', baseUrl + '/info/credits');
    });

    it('click Jobs', function (){
        cy
            .get('.lists :first-child :nth-child(7) :first-child :first-child')
            .click();

        cy
            .url()
            .should('eq', baseUrl + '/jobs');
    });

    it.skip('click Press', function (){
        cy
            .get('.lists :first-child :nth-child(8) :first-child :first-child')
            .click();

        cy
            .url()
            .should('match', /https:\/\/www\.scratchfoundation\.org\/media-kit\/?$/);
    });

});

describe('test Community links in footer', function () {
    beforeEach(function (){
        cy.visit('/');
    });

    after(function (){
        cy.visit('/');
    });

    it('click Community Guidelines', function (){
        cy
            .get('.lists :nth-child(2) :nth-child(2) :first-child :first-child')
            .click();

        cy
            .url()
            .should('eq', baseUrl + '/community_guidelines');
    });

    it('click Discussion Forums', function (){
        cy
            .get('.lists :nth-child(2) :nth-child(3) :first-child :first-child')
            .click();

        cy
            .url()
            .should('eq', baseUrl + '/discuss/');
    });

    it.skip('click Scratch Wiki', function (){
        cy
            .get('.lists :nth-child(2) :nth-child(4) :first-child :first-child')
            .click();

        cy
            .url()
            .should('match', /https:\/\/wiki\.scratch\.mit\.edu\/wiki\/Scratch_Wiki_Home\/?$/);
    });

    it('click Statistics', function (){
        cy
            .get('.lists :nth-child(2) :nth-child(5) :first-child :first-child')
            .click();

        cy
            .url()
            .should('eq', baseUrl + '/statistics/');
    });

});

describe('test Support links in footer', function () {
    beforeEach(function (){
        cy.visit('/');
    });

    after(function (){
        cy.visit('/');
    });

    it('click Tips', function (){
        cy
            .get('.lists :nth-child(3) :nth-child(2) :first-child :first-child')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/tips');
    });

    it('click For FAQ', function (){
        cy
            .get('.lists :nth-child(3) :nth-child(3) :first-child :first-child')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/info/faq');
    });

    it('click Offline Editor', function (){
        cy
            .get('.lists :nth-child(3) :nth-child(4) :first-child :first-child')
            .click();

        cy
            .url()
            .should('eq', baseUrl + '/download');
    });

    it('click Contact Us', function (){
        cy
            .get('.lists :nth-child(3) :nth-child(5) :first-child :first-child')
            .click();

        cy
            .url()
            .should('eq', baseUrl + '/contact-us/');
    });

    it('click Scratch Store', function (){
        cy
            .get('.lists :nth-child(3) :nth-child(6) :first-child :first-child')
            .click();

        cy
            .url()
            .should('match', /^https:\/\/scratch-foundation\.myshopify\.com\/?$/);
    });

    it('click Donate', function (){
        cy
            .get('.lists :nth-child(3) :nth-child(7) :first-child :first-child')
            .click();

        cy
            .url()
            .should('match', /^https:\/\/secure\.donationpay\.org\/scratchfoundation\/?/);
    });

});

describe('test Legal links in footer', function () {
    beforeEach(function (){
        cy.visit('/');
    });

    after(function (){
        cy.visit('/');
    });

    it('click Terms of Use', function (){
        cy
            .get('.lists :nth-child(4) :nth-child(2) :first-child :first-child')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/terms_of_use');
    });

    it('click For Privacy Policy', function (){
        cy
            .get('.lists :nth-child(4) :nth-child(3) :first-child :first-child')
            .click();
        cy
            .url()
            .should('eq', baseUrl + '/privacy_policy');
    });

    it('click DMCA', function (){
        cy
            .get('.lists :nth-child(4) :nth-child(4) :first-child :first-child')
            .click();

        cy
            .url()
            .should('eq', baseUrl + '/DMCA');
    });

});

describe('test Scratch Family links in footer', function () {
    beforeEach(function (){
        cy.visit('/');
    });

    it.skip('click ScratchEd', function (){
        cy
            .get('.lists :nth-child(5) :nth-child(2) a')
            .click();
        cy
            .url()
            .should('match', /^http:\/\/scratched\.gse\.harvard\.edu\/?$/);
    });

    it.skip('click For ScratchJr', function (){
        cy
            .get('.lists :nth-child(5) :nth-child(3) a')
            .click();
        cy
            .url()
            .should('match', /^https:\/\/www\.scratchjr\.org\/?$/);
    });

    it.skip('click Scratch Day', function (){
        cy
            .get('.lists :nth-child(5) :nth-child(4) a')
            .click();

        cy
            .url()
            .should('match', /^https:\/\/day\.scratch\.mit\.edu\/?$/);
    });

    it('click Scratch Conference', function (){
        cy
            .get('.lists :nth-child(5) :nth-child(5) :first-child :first-child')
            .click();

        cy
            .url()
            .should('eq', baseUrl + '/conference');
    });

    it.skip('click Scratch Foundation', function (){
        cy
            .get('.lists :nth-child(5) :nth-child(6) :first-child :first-child')
            .click();

        cy
            .url()
            .should('match', /^https:\/\/www\.scratchfoundation\.org\/?$/);
    });

});
