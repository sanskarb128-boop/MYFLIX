import "./Css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { MovieProvider } from "./context/MovieContext";
import NavBar from "./components/NavBar";
import MovieDetails from "./pages/MovieDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <MovieProvider>
      <NavBar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;