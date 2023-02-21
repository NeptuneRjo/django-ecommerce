// import cy from 'cypress'

describe('Card', () => {
	beforeEach(() => {
		cy.intercept('/api/store/items', {
			fixture: 'itemFixture.json',
		}).as('Items')

		cy.visit('/')
		cy.wait('@Items')
	})

	it('displays correctly', () => {
		cy.get('.card').should('be.visible')
		cy.get('.card__container > img').should('be.visible')
		cy.get('.card__title').should('be.visible')
		cy.get('.card__price').should('be.visible')
		cy.get('.card__rating').should('be.visible')
		cy.get('.card > .button__2').should('be.visible')
	})

	it('contains the correct content', () => {
		cy.get('img')
			.should('have.attr', 'src')
			.should('include', 'https://example.com')
		cy.get('img').should('have.attr', 'alt').should('include', 'test title')

		cy.get('.card__title').contains('test title')
		cy.get('.card__price').contains('$9.99')
		cy.get('.card__rating').contains('4.5 / 5')

		// Button in seperate tests
	})

	it('opens the modal on click', () => {
		cy.get('.card__container').click()
		cy.get('.card-expanded').should('be.visible')
	})

	/*
	
		<-- BUTTONS -->
	
	*/

	it('displays the no user button', () => {
		cy.get('.card > .button__2').contains('Log in to add to cart')
	})

	it('displays the user button', () => {
		cy.intercept('/api/accounts/login', { fixture: 'tokenFixture.json' }).as(
			'Token'
		)
		cy.intercept('/api/accounts/user', { fixture: 'userFixture.json' }).as(
			'User'
		)

		cy.get('.nav__content__buttons > li').contains('Login').click()
		cy.get('input[name="username"]').type('test')
		cy.get('input[name="password"]').type('testpassword')
		cy.get('.login__container > form > .button__1').click()

		cy.wait('@Token')
		cy.wait('@User')

		cy.get('.card > .button__2').contains('Add to Cart')
	})

	it.only('the user button functions', () => {
		cy.intercept('/api/accounts/login', { fixture: 'tokenFixture.json' }).as(
			'Token'
		)
		cy.intercept('/api/accounts/user', { fixture: 'userFixture.json' }).as(
			'User'
		)
		cy.intercept('/api/accounts/add-to-cart')

		cy.get('.nav__content__buttons > li').contains('Login').click()
		cy.get('input[name="username"]').type('test')
		cy.get('input[name="password"]').type('testpassword')
		cy.get('.login__container > form > .button__1').click()

		cy.wait('@Token')
		cy.wait('@User')

		cy.get('.card > .button__2').click()
		cy.get('.card > .button__2').contains('In cart')
	})
})
