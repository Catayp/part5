describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      userName: 'pepe',
      name: 'pepe',
      password: '1',
      blogId: '62ab9b24c98ebc89655df070'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.get('#userName')
    cy.get('#password')
    cy.get('#login')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function () {
      cy.get('#userName').type('pepe')
      cy.get('#password').type('1')
      cy.get('#login').click()
      cy.contains('Sesion successful')
    })
    it('fails with wrong credentials', function() {
      cy.get('#userName').type('a')
      cy.get('#password').type('a')
      cy.get('#login').click()
      cy.get('.error').contains('Please provide a valid email address and password')
    })
  })

  describe('crud blog', function() {
    beforeEach(function() {
      cy.get('#userName').type('pepe')
      cy.get('#password').type('1')
      cy.get('#login').click()
      cy.contains('Sesion successful')
    })
    it.only('new blog', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('pato')
      cy.get('#author').type('f')
      cy.get('#url').type('j')
      cy.get('#saveBlog').click()
      cy.contains('blog added')
      cy.get('#list').should('contain','pato')
    })
    it('update like', function() {
      cy.get('#like').click()
      cy.contains('+1 like')
    })
    it('deleted blog', function(){
      cy.get('#deleteBlog').click()
      cy.contains('blog delete')
    })
  })
})