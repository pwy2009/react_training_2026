import { NavLink } from "react-router-dom";

// Site header navigation.
// TODO (Milestone 5): show the live bookmark count from the bookmarks store.
export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <NavLink to="/" end className="brand">
          <span className="brand__mark" aria-hidden="true">◆</span> Blog Explorer
        </NavLink>
        <nav aria-label="Main">
          <ul className="nav">
            <li><NavLink to="/posts">Posts</NavLink></li>
            <li>
              <NavLink to="/bookmarks" end>
                Bookmarks <span className="badge" aria-label="0 items">0</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
