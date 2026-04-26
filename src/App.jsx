import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("newroots-theme") || "warm"
  );

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("newroots-theme", theme);
  }, [theme]);
  return (
    <main>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/new" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
      </Routes>
    </main>
  );
};

export default App;
