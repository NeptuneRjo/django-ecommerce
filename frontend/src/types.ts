export interface StoreItemInt {
	item_category: string
	item_description: string
	item_image_url: string
	item_price: string
	item_rating: string
	item_count: string
	item_title: string
}

export interface AccountInt {
	account: {
		user: {
			username: string
		}
		account_cart: StoreItemInt[]
	}
}
