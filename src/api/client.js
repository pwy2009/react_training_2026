// Every request to the server goes through this file.
// Keeping it in one place means tests can mock it with jest.mock().
import { API_BASE_URL } from "../appConfig";

export { API_BASE_URL };

export async function getJson(path, { signal } = {}) {
	const response = await fetch(`${API_BASE_URL}${path}`, { signal });

	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}

	return response.json();
}
