import "../Css/MovieDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieTrailer } from "../services/api";
import { useMovieContext } from "../context/MovieContext";

function MovieDetails() {
    const { id } = useParams();
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadMovie();
    }, [id]);

    if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", color: "#fff", fontSize: "1.5rem" }}>
            Loading...
        </div>
    );

    const favorite = isFavorite(movie.id);

    const handleTrailerClick = async () => {
        try {
            const trailer = await getMovieTrailer(id);
            if (trailer) {
                window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
            } else {
                alert("Trailer not available");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleFavoriteClick = () => {
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    };

    return (
        <div className="movie-details-page">
            {/* Blurred backdrop */}
            <div
                className="movie-backdrop"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})`
                }}
            />

            <div className="movie-details-content">
                <img
                    className="movie-details-poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />

                <div className="movie-details-info">
                    <h1>{movie.title}</h1>

                    <div className="movie-meta">
                        <span className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
                        <span className="movie-year">{movie.release_date?.split("-")[0]}</span>
                        <span className="movie-runtime">⏱ {movie.runtime} mins</span>
                    </div>

                    <div className="movie-genres">
                        {movie.genres?.map((genre) => (
                            <span key={genre.id} className="genre-tag">{genre.name}</span>
                        ))}
                    </div>

                    <p className="movie-overview">{movie.overview}</p>

                    <div className="movie-details-actions">
                        <button className="trailer-btn" onClick={handleTrailerClick}>
                            ▶ Watch Trailer
                        </button>
                        <button
                            className={`favorite-btn-detail ${favorite ? "active" : ""}`}
                            onClick={handleFavoriteClick}
                        >
                            {favorite ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;