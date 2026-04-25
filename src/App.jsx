import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
};

export default App;
