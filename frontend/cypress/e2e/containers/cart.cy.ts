describe('Cart page', () => {
	beforeEach(() => {
		cy.intercept('/api/accounts/login', {
			fixture: 'tokenFixture.json',
		}).as('Token')

		cy.intercept('/api/store/items', {
			fixture: 'itemFixture.json',
		}).as('Items')

		cy.intercept('/api/accounts/user', {
			fixture: 'userFixture.json',
		}).as('User')

		cy.visit('/')

		cy.get('.nav__content__buttons > li').contains('Login').click()
		cy.get('input[name="username"]').type('test')
		cy.get('input[name="password"]').type('testpassword')
		cy.get('form > .button__1').click()

		cy.wait('@Token')
		cy.wait('@User')

		cy.get('.nav__content__buttons li a').contains('Cart').click()
	})

	it('displays the cart correctly (with item)', () => {
		cy.get('.cart__items > .card').should('have.length', 1)
		cy.get('.cart__info').should('be.visible')
		cy.get('.cart__info > .button__1').should('be.visible')
	})

	it('shows the correct content (with item)', () => {
		cy.get('.cart__info > ul > li').eq(0).contains('Quantity: 1')
		cy.get('.cart__info > ul > li').eq(1).contains('Total: $9.99')
	})

	it('remove item works', () => {
		cy.intercept('/api/accounts/remove-from-cart', {
			fixture: 'userFixtureTwo.json',
		}).as('User2')

		cy.get('.card > .button__2').click()

		cy.wait('@User2')

		cy.get('.card').should('not.exist')
	})

	it.only('shows empty cart', () => {
		cy.intercept('/api/accounts/remove-from-cart', {
			fixture: 'userFixtureTwo.json',
		}).as('User2')

		cy.get('.card > .button__2').click()

		cy.wait('@User2')

		cy.get('.cart__container > .cart__empty').should('be.visible')
	})
})
