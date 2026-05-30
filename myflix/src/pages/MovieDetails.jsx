import "../Css/MovieDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieTrailer } from "../services/api";


function MovieDetails() {
    const { id } = useParams();

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

    if (loading) return <h2>Loading...</h2>;

    const handleTrailerClick = async () => {
        try {
            const trailer = await getMovieTrailer(id);

            if (trailer) {
                window.open(
                    `https://www.youtube.com/watch?v=${trailer.key}`,
                    "_blank"
                );
            } else {
                alert("Trailer not available");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="movie-details">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />

            <div>
                <h1>{movie.title}</h1>

                <p>
                    ⭐ {movie.vote_average?.toFixed(1)}
                </p>

                <p>
                    Release Date: {movie.release_date}
                </p>

                <p>
                    Runtime: {movie.runtime} mins
                </p>

                <p>
                    {movie.overview}
                </p>

                <p>
                    Genres:{" "}
                    {movie.genres?.map((genre) => genre.name).join(", ")}
                </p>
                <button
                    className="trailer-btn"
                    onClick={handleTrailerClick}
                >
                    ▶ Watch Trailer
                </button>
            </div>
        </div>
    );
}

export default MovieDetails;