// App settings read from environment variables (.env.local).
// Jest can't read import.meta, so tests use test-mocks/appConfig.js instead (see jest.config.cjs).
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://jsonplaceholder.typicode.com";
