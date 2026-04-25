import { NavLink } from "react-router";

export const Navbar = () => {
  return (
    <aside>
      <nav>
        <NavLink to="/">
          New <span>Root</span>
        </NavLink>
        <NavLink to="/posts/new">Create Post</NavLink>
      </nav>
    </aside>
  );
};

export default Navbar;
