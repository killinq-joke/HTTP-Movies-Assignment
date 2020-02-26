import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MovieCard = ({ movie, movies, setMovieList }) => {
  const { title, director, metascore, stars, id } = movie;
  const history = useHistory();

  const deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res);
        setMovieList(movies.filter(m => m.id !== id));
        history.push("/")
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      
      <button onClick={evt => deleteMovie(id)}>Delete</button>
    </div>
  );
};

export default MovieCard;
