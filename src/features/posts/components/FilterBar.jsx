const SORT_LABELS = {
  oldest: "Oldest first",
  title: "Title A to Z",
};

export function FilterBar({
  query,
  authorId,
  sort,
  view,
  users,
  resultCount,
  totalCount,
  onFilterChange,
  onReset,
}) {
  const selectedAuthor = users.find(user => String(user.id) === authorId);
  const activeFilters = [];

  if (query.trim()) activeFilters.push({ key: "q", label: `Search: "${query.trim()}"` });
  if (authorId) activeFilters.push({ key: "author", label: `Author: ${selectedAuthor?.name ?? authorId}` });
  if (sort !== "newest") activeFilters.push({ key: "sort", label: `Sort: ${SORT_LABELS[sort]}` });
  if (view !== "grid") activeFilters.push({ key: "view", label: "View: List" });

  return (
    <section className="filter-panel filter-bar" aria-label="Post filters">
      <div className="filter-bar__fields">
        <label className="field">
          Search titles
          <input
            className="input"
            type="search"
            value={query}
            onChange={event => onFilterChange("q", event.target.value)}
          />
        </label>
        <label className="field">
          Author
          <select
            className="select"
            value={authorId}
            onChange={event => onFilterChange("author", event.target.value)}
          >
            <option value="">All authors</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Sort by
          <select
            className="select"
            value={sort}
            onChange={event => onFilterChange("sort", event.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A to Z</option>
          </select>
        </label>
      </div>

      <div className="filter-bar__toolbar">
        <div className="cluster" role="group" aria-label="Post view">
          <button
            className="btn"
            type="button"
            aria-pressed={view === "grid"}
            onClick={() => onFilterChange("view", "grid")}
          >
            Grid
          </button>
          <button
            className="btn"
            type="button"
            aria-pressed={view === "list"}
            onClick={() => onFilterChange("view", "list")}
          >
            List
          </button>
        </div>
        <div className="filter-bar__summary">
          <p aria-live="polite">Showing {resultCount} of {totalCount} posts</p>
          <button className="btn btn--ghost" type="button" onClick={onReset} disabled={activeFilters.length === 0}>
            Reset filters
          </button>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="cluster filter-bar__chips" aria-label="Active filters">
          {activeFilters.map(filter => (
            <span className="chip" key={filter.key}>
              {filter.label}
              <button
                type="button"
                aria-label={`Remove ${filter.key === "q" ? "search" : filter.key} filter`}
                onClick={() => onFilterChange(filter.key, filter.key === "sort" ? "newest" : filter.key === "view" ? "grid" : "")}
              >
                x
              </button>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}