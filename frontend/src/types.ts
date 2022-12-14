export interface StoreItem {
	item_name: string
	item_price: number
	item_thumb_url: string
}

export interface Account {
	user: {
		username: string
	}
	account_cart: StoreItem[]
}
