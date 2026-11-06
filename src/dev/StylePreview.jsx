// A static gallery of the ready-made styles, so you can see every class before you use it.
// Everything here is hard-coded sample data shaped like JSONPlaceholder's.
// Delete this file once your real pages exist.
import { capitalize, initials, truncate } from "../utils/format";

const posts = [
  { id: 1, userId: 1, title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam" },
  { id: 2, userId: 1, title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque" },
  { id: 11, userId: 2, title: "et ea vero quia laudantium autem",
    body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus" },
];
const users = { 1: { id: 1, name: "Leanne Graham", username: "Bret" }, 2: { id: 2, name: "Ervin Howell", username: "Antonette" } };
const comment = { id: 1, name: "id labore ex et quam laborum", email: "Eliseo@gardner.biz",
  body: "laudantium enim quasi est quidem magnam voluptate ipsam eos" };

function Section({ title, children }) {
  return (
    <section className="stack" style={{ marginBottom: 48 }}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function StylePreview() {
  return (
    <>
      <div className="page-header">
        <h1>Starter style guide</h1>
        <p>Every class you can use is shown below. Class names are listed in the README.</p>
      </div>

      <Section title="Buttons">
        <div className="cluster">
          <button className="btn btn--primary">Primary</button>
          <button className="btn">Default</button>
          <button className="btn btn--ghost">Ghost</button>
          <button className="btn btn--danger">Remove</button>
          <button className="btn" aria-pressed="true">★ Bookmarked</button>
          <button className="btn btn--icon" aria-label="Bookmark this post">☆</button>
          <button className="btn" disabled>Disabled</button>
        </div>
      </Section>

      <Section title="Badges, tags and chips">
        <div className="cluster">
          <span className="badge">3</span>
          <span className="tag">5 comments</span>
          <span className="chip">
            Author: Leanne Graham <button aria-label="Remove author filter">✕</button>
          </span>
          <span className="chip">
            Search: "qui" <button aria-label="Remove search filter">✕</button>
          </span>
        </div>
      </Section>

      <Section title="Filters and form fields">
        <div className="filter-panel" style={{ maxWidth: 320 }}>
          <label className="field">
            Search titles
            <input className="input" type="search" placeholder="e.g. qui est" />
          </label>
          <label className="field">
            Author
            <select className="select">
              <option>All authors</option>
              <option>Leanne Graham</option>
            </select>
          </label>
          <label className="field">
            Sort by
            <select className="select">
              <option>Newest first</option>
              <option>Title A to Z</option>
            </select>
          </label>
          <label className="field">
            Your email
            <input className="input" aria-invalid="true" defaultValue="not-an-email" />
            <span className="field__error">Enter a valid email address</span>
          </label>
        </div>
      </Section>

      <Section title="Post cards">
        <ul className="post-grid">
          {posts.map(p => (
            <li key={p.id}>
              <article className="post-card">
                <span className="post-card__id">#{p.id}</span>
                <h3 className="post-card__title">{capitalize(p.title)}</h3>
                <p className="post-card__excerpt">{truncate(p.body.replace(/\n/g, " "), 90)}</p>
                <div className="post-card__footer">
                  <span className="byline">
                    <span className="avatar" aria-hidden="true">{initials(users[p.userId].name)}</span>
                    {users[p.userId].name}
                  </span>
                  <button className="btn btn--icon" aria-label={`Bookmark post ${p.id}`}>☆</button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Author card and stats">
        <div style={{ maxWidth: 320 }}>
          <aside className="author-card" aria-label="About the author">
            <div className="byline">
              <span className="avatar avatar--large" aria-hidden="true">LG</span>
              <div><strong>Leanne Graham</strong><br />@Bret</div>
            </div>
            <ul className="meta-list">
              <li><span>Company</span><span>Romaguera-Crona</span></li>
              <li><span>City</span><span>Gwenborough</span></li>
            </ul>
          </aside>
        </div>
        <div className="stat-row">
          <div className="stat"><span className="stat__value">10</span><span className="stat__label">Posts</span></div>
          <div className="stat"><span className="stat__value">11/20</span><span className="stat__label">Todos done</span></div>
        </div>
        <div className="progress" role="progressbar" aria-valuenow={55} aria-valuemin={0} aria-valuemax={100}
             aria-label="Todos completed">
          <div className="progress__bar" style={{ width: "55%" }} />
        </div>
      </Section>

      <Section title="Comments">
        <ul className="comment-list">
          <li className="comment">
            <span className="avatar" aria-hidden="true">EG</span>
            <div>
              <p className="comment__name">{comment.name}</p>
              <span className="comment__email">{comment.email}</span>
              <p className="comment__body">{comment.body}</p>
            </div>
          </li>
          <li className="comment comment--local">
            <span className="avatar" aria-hidden="true">YO</span>
            <div>
              <p className="comment__name">Your comment</p>
              <span className="comment__email">Saved in this browser only</span>
              <p className="comment__body">Comments you add use the comment--local class.</p>
            </div>
          </li>
        </ul>
      </Section>

      <Section title="Loading, empty and error states">
        <div className="cluster"><div className="spinner" role="status" aria-label="Loading" /></div>
        <div className="skeleton" style={{ height: 80 }} aria-hidden="true" />
        <div className="alert alert--error" role="alert">
          Couldn't load posts. <button className="btn">Try again</button>
        </div>
        <div className="alert alert--success">Comment added.</div>
        <div className="empty-state">
          <p>No posts match these filters.</p>
          <button className="btn">Reset filters</button>
        </div>
      </Section>

      <Section title="Previous and next">
        <nav className="pager" aria-label="Post navigation">
          <button className="btn">← Previous</button>
          <span className="muted">3 of 10</span>
          <button className="btn">Next →</button>
        </nav>
      </Section>
    </>
  );
}
