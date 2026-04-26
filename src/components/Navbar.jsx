import { NavLink } from "react-router";

export const Navbar = () => {
  return (
    <aside>
      <nav>
        <NavLink className="brand-link" to="/">
          New <span>Root</span>
        </NavLink>
        <NavLink className="create-post-button" to="/posts/new">
          Create Post
        </NavLink>
      </nav>
    </aside>
  );
};

export default Navbar;
