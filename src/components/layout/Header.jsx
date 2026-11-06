// Site header. The links are plain anchors for now.
// TODO (Milestone 2): swap <a> for React Router's <NavLink>.
// TODO (Milestone 5): show the live bookmark count from the bookmarks store.
export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="/" className="brand">
          <span className="brand__mark" aria-hidden="true">◆</span> Blog Explorer
        </a>
        <nav aria-label="Main">
          <ul className="nav">
            <li><a href="/posts">Posts</a></li>
            <li>
              <a href="/bookmarks">
                Bookmarks <span className="badge" aria-label="0 items">0</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
