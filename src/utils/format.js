// Shared text helpers. Pure functions: easy to unit test.

/** truncate("Hello world", 5) → "Hello…" */
export function truncate(text, max) {
  return text.length <= max ? text : text.slice(0, max).trimEnd() + "…";
}

/** initials("Leanne Graham") → "LG" (used for avatar circles) */
export function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join("");
}

/** capitalize("sunt aut facere") → "Sunt aut facere" (JSONPlaceholder titles are lowercase) */
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
