export const getItems = async () => {
	const response: Response = await fetch(
		'http://localhost:8000/api/store/items'
	)
	const json = await response.json()

	return json
}
