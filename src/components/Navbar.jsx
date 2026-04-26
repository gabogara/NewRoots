import { NavLink } from "react-router";

export const Navbar = ({ theme, setTheme }) => {
  return (
    <aside>
      <nav>
        <NavLink className="brand-link" to="/">
          New <span>Root</span>
        </NavLink>
        <div className="nav-actions">
          <select
            className="theme-select"
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
          >
            <option value="warm">Warm</option>
            <option value="green">Green</option>
            <option value="dark">Dark</option>
          </select>
        <NavLink className="create-post-button" to="/posts/new">
          Create Post
        </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
