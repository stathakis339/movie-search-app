import { useState } from "react";
import "./MovieSearch.css";

const API_KEY = "f3c6aa3b";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async () => {
    setLoading(true);
    setError("");

    const res = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`,
    );
    const data = await res.json();

    if (data.Response === "False") {
      setError("No movies found!");
      setMovies([]);
    } else {
      setMovies(data.Search || []);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🎬 Movie Search</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies()}
        />
        <button onClick={searchMovies}>Search</button>
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
