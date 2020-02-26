import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Form/UpdateForm";
import AddForm from "./Form/AddForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [currentMovieId, setCurrentMovieId] = useState(null);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Link to="/add-movie">Add Movie</Link>

      <Route exact path="/">
        <MovieList movies={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie
          addToSavedList={addToSavedList}
          setCurrentMovieId={setCurrentMovieId}
        />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateForm id={currentMovieId} setMovieList={setMovieList} />
      </Route>
      <Route path="/add-movie">
        <AddForm setMovieList={setMovieList}/>
      </Route>
    </>
  );
};

export default App;
