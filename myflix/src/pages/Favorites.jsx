import "../Css/Favorites.css";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites && favorites.length > 0) {
        return (
            <div className="favorites">
                <div className="favorites-header">
                    <h2>Your Favorites</h2>
                    <span className="favorites-count">{favorites.length} movies</span>
                </div>
                <div className="movies-grid">
                    {favorites.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="favorites">
            <div className="favorites-empty">
                <div className="favorites-empty-icon">❤️</div>
                <h2>No Favorites Yet</h2>
                <p>Start adding movies to your collection!</p>
                <Link to="/" className="favorites-empty-btn">
                    Browse Movies
                </Link>
            </div>
        </div>
    );
}

export default Favorites;