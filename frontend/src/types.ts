export interface StoreItemInt {
	item_name: string
	item_price: number
	item_thumb_url: string
}

export interface AccountInt {
	account: {
		user: {
			username: string
		}
		account_cart: StoreItemInt[]
	}
}
