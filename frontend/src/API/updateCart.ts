import { StoreItem } from '../types'

export const updateCart = async (
	token: string,
	toAdd: StoreItem[],
	toRemove: StoreItem[]
) => {
	const response: Response = await fetch(
		'http://localhost:8000/api/store/cart',
		{
			method: 'PATCH',
			headers: {
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify({
				to_add: toAdd,
				to_remove: toRemove,
			}),
		}
	)
	const json = await response.json()

	if (!response.ok) {
		return {
			data: json?.account,
			errors: {
				to_add: json?.to_add_error,
				to_remove: json?.to_remove_error,
			},
		}
	} else {
		return { data: json?.account, errors: undefined }
	}

	return json
}
