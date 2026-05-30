const API_KEY = "bb23bbbfdaf67ebfbe73744132955f72";

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async () => {
    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );

    const data = await response.json();

    return data.results || [];
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    return data.results || [];
};

export const getMovieDetails = async (movieId) => {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );

    const data = await response.json();

    return data;
};

export const getMovieTrailer = async (movieId) => {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );

    const data = await response.json();

    const trailer =
        data.results.find(
            video =>
                video.site === "YouTube" &&
                video.type === "Trailer"
        ) || data.results[0];

    return trailer;
};