export const registerUser = async (
	username: string,
	password: string,
	password2: string
) => {
	const response: Response = await fetch(
		`${process.env.REACT_APP_API_URL}/api/accounts/register`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
				password2: password2,
			}),
		}
	)
	const json = await response.json()

	if (response.ok) {
		return { data: json, error: undefined }
	} else {
		return { data: undefined, error: json.error }
	}
}
