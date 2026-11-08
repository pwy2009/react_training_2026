import { capitalize, initials, truncate } from "../../../utils/format";

export function PostCard({ post, author, onPostClick, onAuthorClick }) {
  return (
    <article className="post-card">
      <span className="post-card__id">#{post.id}</span>
      <h2 className="post-card__title">
        <button
          className="post-card__title-action"
          type="button"
          onClick={() => onPostClick(post)}
        >
          {capitalize(post.title)}
        </button>
      </h2>
      <p className="post-card__excerpt">{truncate(post.body.replace(/\s+/g, " "), 140)}</p>
      <div className="post-card__footer">
        {author ? (
          <button
            className="byline post-card__author-action"
            type="button"
            onClick={() => onAuthorClick(author)}
          >
            <span className="avatar" aria-hidden="true">{initials(author.name)}</span>
            {author.name}
          </button>
        ) : (
          <span className="muted">Unknown author</span>
        )}
      </div>
    </article>
  );
}