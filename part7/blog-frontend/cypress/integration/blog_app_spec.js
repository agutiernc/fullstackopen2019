describe('Blog app with fake user', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'The Joker',
      username: 'joker',
      password: 'hahaha'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000/')
  })

  it('Log-in page is opened', function () {
    cy.contains('Log-in to your blog account')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username')
        .type('joker')
      cy.get('#password')
        .type('hahaha')
      cy.contains('Login')
        .click()
    })

    it('name of user logged in', function () {
      cy.contains('The Joker logged in')
    })

    it('create a new blog and remove it on blog view page', function () {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('how to fake test the blog')
      cy.get('#author')
        .type('Joker')
      cy.get('#url')
        .type('http://bing.com')
      cy.get('#create')
        .click()
      cy.contains('how to fake test the blog - Joker')
        .click()
      cy.contains('remove')
        .click()
    })

    it('click on users in Menu', function () {
      cy.get('#users')
        .click()
    })

    it('log user out', function() {
      cy.contains('log out')
        .click()
    })
  })

})