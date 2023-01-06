export const getItems = async () => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/store/items`
	)
	const json = await response.json()

	return json
}
