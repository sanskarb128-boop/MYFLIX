import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import SkeletonCard from "../components/SkeletonCard";
import { searchMovies, fetchMovies } from "../services/api";
import "../Css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await fetchMovies(1);
                setMovies(popularMovies);
            } catch {
                setError("Failed to load movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        setIsSearching(true);
        setPage(1);
        try {
            const searchResults = await searchMovies(searchQuery, 1);
            setMovies(searchResults);
            setError(null);
        } catch {
            setError("Failed to search movies. Please try again later.");
        } finally {
            setLoading(false);
        }
        setSearchQuery("");
    };

    const handleLoadMore = async () => {
        setLoadingMore(true);
        const nextPage = page + 1;
        try {
            const moreMovies = isSearching
                ? await searchMovies(searchQuery, nextPage)
                : await fetchMovies(nextPage);
            setMovies(prev => [...prev, ...moreMovies]);
            setPage(nextPage);
        } catch {
            setError("Failed to load more movies.");
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <div className="home">
            <div className="hero">
                <h1>Find Your Next Favorite Movie</h1>
                <p>Explore trending, top-rated and upcoming movies from around the world.</p>
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>

            <div className="movies-section">
                <h2 className="section-title">Trending Now</h2>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="movies-grid">
                        {[...Array(8)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="movies-grid">
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>

                        <div className="load-more-container">
                            <button
                                className="load-more-btn"
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                            >
                                {loadingMore ? "Loading..." : "Load More"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;