import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  async function fetchMovies() {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films?format=json");
      const moviesData = await response.json();
      setMovies(moviesData.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>Welcome to Movie Fetcher!</h1>
      <button onClick={fetchMovies}>
        {isLoading ? "Loading..." : "Fetch Movies"}
      </button>
      <div className="movie-data-container">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-credits">
              Directed by: <b>{movie.director}</b><br />
              Produced by: <b>{movie.producer}</b><br />
              Released in: <b>{movie.release_date}</b>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;