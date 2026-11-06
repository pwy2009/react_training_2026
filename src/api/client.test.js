import { API_BASE_URL } from "./client";

// Sample test: proves the API layer can be imported in tests (import.meta is handled).
test("uses the JSONPlaceholder base URL", () => {
  expect(API_BASE_URL).toBe("https://jsonplaceholder.typicode.com");
});
