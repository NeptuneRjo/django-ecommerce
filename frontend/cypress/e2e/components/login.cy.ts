describe('Login', () => {
	beforeEach(() => {
		cy.intercept('/api/store/items', {
			fixture: 'itemFixture.json',
		}).as('Items')

		cy.visit('/')
		cy.wait('@Items')
	})

	it('opens the login modal', () => {
		cy.get('.nav__content__buttons > li').contains('Login').click()

		cy.get('.login').should('be.visible')
	})

	it('displays the content', () => {
		cy.get('.nav__content__buttons > li').contains('Login').click()

		cy.get('.login__close').should('be.visible')
		cy.get('label[for="username"').should('be.visible')
		cy.get('input[name="username"').should('be.visible')
		cy.get('label[for="password"').should('be.visible')
		cy.get('input[name="password"').should('be.visible')
		cy.get('form > .button__1').should('be.visible')
	})

	it('functions correctly', () => {
		cy.intercept('/api/accounts/login', { fixture: 'tokenFixture.json' }).as(
			'Token'
		)
		cy.intercept('/api/accounts/user', { fixture: 'userFixture.json' }).as(
			'User'
		)

		cy.get('.nav__content__buttons > li').contains('Login').click()
		cy.get('input[name="username"]').type('test')
		cy.get('input[name="password"]').type('testpassword')
		cy.get('form > .button__1').click()

		cy.wait('@Token')
		cy.wait('@User')

		cy.get('.nav__content__buttons > li > a').eq(0).contains('test')
	})
})
