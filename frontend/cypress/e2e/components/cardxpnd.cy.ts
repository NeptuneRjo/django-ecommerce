describe('Card Expanded', () => {
	beforeEach(() => {
		cy.intercept('/api/store/items', {
			fixture: 'itemFixture.json',
		}).as('Items')

		cy.visit('/')
		cy.wait('@Items')
	})

	it('opens the modal on click', () => {
		cy.get('.card__container').click()

		cy.get('.card-expanded').should('be.visible')
	})

	it('displays the content in the modal', () => {
		cy.get('.card__container').click()

		cy.get('.card-expanded__close').should('be.visible')
		cy.get('.card-expanded__container img').should('be.visible')
		cy.get('.card-expanded__title').should('be.visible')

		// description
		cy.get('.card-expanded__content > p').eq(0).should('be.visible')
		// categories
		cy.get('.card-expanded__content > p').eq(1).should('be.visible')
		// price
		cy.get('.card-expanded__components > p').eq(0).should('be.visible')
		// rating
		cy.get('.card-expanded__components > p').eq(1).should('be.visible')

		cy.get('.card-expanded__container > .button__2').should('be.visible')
	})

	it('contains the correct content', () => {
		cy.get('.card__container').click()

		cy.get('.card-expanded__close').contains('X')

		cy.get('.card-expanded__container img')
			.should('have.attr', 'src')
			.should('include', 'https://example.com')
		cy.get('.card-expanded__container img')
			.should('have.attr', 'alt')
			.should('include', 'test title')

		cy.get('.card-expanded__title').contains('test title')

		// description
		cy.get('.card-expanded__content > p').eq(0).contains('test description')
		// categories
		cy.get('.card-expanded__content > p').eq(1).contains('Categories: category')
		// price
		cy.get('.card-expanded__components > p').eq(0).contains('$9.99')
		// rating
		cy.get('.card-expanded__components > p').eq(1).contains('4.5 / 5')

		// Button in seperate tests
	})

	/*
	
		<-- BUTTONS -->
	
	*/

	it('displays the no user button', () => {
		cy.get('.card__container').click()

		cy.get('.card-expanded__container > .button__2').contains(
			'Log in to add to cart'
		)
	})

	it('displays the user button', () => {
		cy.intercept('/api/accounts/login', { fixture: 'tokenFixture.json' }).as(
			'Token'
		)
		cy.intercept('/api/accounts/user', { fixture: 'userFixtureTwo.json' }).as(
			'User'
		)

		cy.get('.nav__content__buttons > li').contains('Login').click()
		cy.get('input[name="username"]').type('test')
		cy.get('input[name="password"]').type('testpassword')
		cy.get('.login__container > form > .button__1').click()

		cy.wait('@Token')
		cy.wait('@User')

		cy.get('.card__container').click()

		cy.get('.card-expanded__container > .button__2').contains('Add to Cart')
	})

	it('the user button functions', () => {
		cy.intercept('/api/accounts/login', { fixture: 'tokenFixture.json' }).as(
			'Token'
		)
		cy.intercept('/api/accounts/user', { fixture: 'userFixtureTwo.json' }).as(
			'User'
		)
		cy.intercept('/api/accounts/add-to-cart', { fixture: 'userFixture.json' })

		cy.get('.nav__content__buttons > li').contains('Login').click()
		cy.get('input[name="username"]').type('test')
		cy.get('input[name="password"]').type('testpassword')
		cy.get('.login__container > form > .button__1').click()

		cy.wait('@Token')
		cy.wait('@User')

		cy.get('.card__container').click()

		cy.get('.card-expanded__container > .button__2').click()
		cy.get('.card-expanded__container > .button__2').contains('In cart')
	})

	it('the close button works', () => {
		cy.get('.card__container').click()

		cy.get('.card-expanded__close').click()

		cy.get('.card-expanded').should('not.exist')
	})
})
