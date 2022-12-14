export const getAccount = async (token: string) => {
	const response: Response = await fetch('http://localhost:8000/api/cart', {
		method: 'GET',
		headers: {
			Authorization: `Token ${token}`,
		},
	})
	const json = await response.json()

	return json
}
