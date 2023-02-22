describe('Register', () => {
	beforeEach(() => {
		cy.intercept('/api/store/items', {
			fixture: 'itemFixture.json',
		}).as('Items')

		cy.visit('/')
		cy.wait('@Items')
	})

	it('opens the register modal', () => {
		cy.get('.nav__content__buttons > li').contains('Register').click()

		cy.get('.register').should('be.visible')
	})

	it('displays the content', () => {
		cy.get('.nav__content__buttons > li').contains('Register').click()

		cy.get('.register__close').should('be.visible')
		cy.get('label[for="username"').should('be.visible')
		cy.get('input[name="username"').should('be.visible')
		cy.get('label[for="password"').should('be.visible')
		cy.get('input[name="password"').should('be.visible')
		cy.get('label[for="password2"').should('be.visible')
		cy.get('input[name="password2"').should('be.visible')
		cy.get('form > .button__1').should('be.visible')
	})

	it('functions correctly', () => {
		cy.intercept('/api/accounts/register', { fixture: 'tokenFixture.json' }).as(
			'Token'
		)
		cy.intercept('/api/accounts/user', { fixture: 'userFixture.json' }).as(
			'User'
		)

		cy.get('.nav__content__buttons > li').contains('Register').click()
		cy.get('input[name="username"]').type('helloworld')
		cy.get('input[name="password"]').type('testpassword')
		cy.get('input[name="password2"]').type('testpassword')

		cy.get('form > .button__1').click()

		cy.wait('@Token')
		cy.wait('@User')

		cy.get('.nav__content__buttons > li > a').eq(0).contains('test')
	})

	it('shows passwords do not match', () => {
		cy.intercept('/api/accounts/register', { fixture: 'tokenFixture.json' }).as(
			'Token'
		)
		cy.intercept('/api/accounts/user', { fixture: 'userFixture.json' }).as(
			'User'
		)

		cy.get('.nav__content__buttons > li').contains('Register').click()
		cy.get('input[name="username"]').type('helloworld')
		cy.get('input[name="password"]').type('testpassword')
		cy.get('input[name="password2"]').type('testpassword2')

		cy.get('form > .button__1').click()

		cy.get('form > p').contains('Passwords do not match').should('be.visible')
	})

	it('shows that inputs are invalid', () => {
		cy.intercept('/api/accounts/register', { fixture: 'tokenFixture.json' }).as(
			'Token'
		)
		cy.intercept('/api/accounts/user', { fixture: 'userFixture.json' }).as(
			'User'
		)

		cy.get('.nav__content__buttons > li').contains('Register').click()
		cy.get('input[name="username"]').type('123')
		cy.get('input[name="password"]').type('test')
		cy.get('input[name="password2"]').type('test')

		cy.get('form > .button__1').click()

		cy.get('form > p')
			.contains(
				'Username must be longer than 3 characters, and passwords should be atleast 6 characters long'
			)
			.should('be.visible')
	})
})
