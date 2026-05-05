import { useState } from "react";

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
    <div>
      <h1>🎬 Movie Search</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchMovies}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.map((movie) => (
        <div key={movie.imdbID}>
          <img src={movie.Poster} alt={movie.Title} width={100} />
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieSearch;
