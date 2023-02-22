describe('Navbar', () => {
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
		cy.wait('@Items')
	})

	it('displays correctly (no user)', () => {
		cy.get('.nav > h3 > a').should('be.visible')
		cy.get('.nav__content__links > li > a').eq(0).should('be.visible')
		cy.get('.nav__content__links > li > a').eq(1).should('be.visible')
		cy.get('.nav__content__buttons > li > div').eq(0).should('be.visible')
		cy.get('.nav__content__buttons > li > div').eq(1).should('be.visible')
	})

	it('displays correctly (user)', () => {
		cy.get('.nav__content__buttons > li').contains('Login').click()
		cy.get('input[name="username"]').type('test')
		cy.get('input[name="password"]').type('testpassword')
		cy.get('form > .button__1').click()

		cy.wait('@Token')
		cy.wait('@User')

		cy.get('.nav > h3 > a').should('be.visible')
		cy.get('.nav__content__links > li > a').eq(0).should('be.visible')
		cy.get('.nav__content__links > li > a').eq(1).should('be.visible')
		cy.get('.nav__content__buttons > li > a').eq(0).should('be.visible')
		cy.get('.nav__content__buttons > li > a').eq(1).should('be.visible')
		cy.get('.nav__content__buttons > li > a').eq(2).should('be.visible')
	})

	it('displays the correct user content', () => {
		cy.get('.nav__content__buttons > li').contains('Login').click()
		cy.get('input[name="username"]').type('test')
		cy.get('input[name="password"]').type('testpassword')
		cy.get('form > .button__1').click()

		cy.wait('@Token')
		cy.wait('@User')

		cy.get('.nav__content__buttons > li > a').eq(0).contains('test')
		cy.get('.nav__content__buttons > li > a').eq(1).contains('Cart')
		cy.get('.nav__content__buttons > li > a').eq(2).contains('Logout')
	})

	it('links correctly', () => {
		cy.get('.nav__content__links > li > a')
			.eq(0)
			.should('have.attr', 'href')
			.should('include', '#/store')
		cy.get('.nav__content__links > li > a')
			.eq(1)
			.should('have.attr', 'href')
			.should('include', '#/about')
		cy.get('.nav > h3 > a')
			.should('have.attr', 'href')
			.should('include', '#/store')
	})
})
