// Every request to the server goes through this file.
// Keeping it in one place means tests can mock it with jest.mock().
import { API_BASE_URL } from "../appConfig";

export { API_BASE_URL };

// TODO (Milestone 1): write getJson(path, { signal })
//  - fetch `${API_BASE_URL}${path}` with the AbortSignal
//  - throw an Error when res.ok is false (JSONPlaceholder returns 404 for unknown ids)
//  - return the parsed JSON
