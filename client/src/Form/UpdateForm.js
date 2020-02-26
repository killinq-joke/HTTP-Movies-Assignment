import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function UpdateForm({ id, setMovieList }) {
  console.log(setMovieList);
  const history = useHistory();
  const [formValues, setFormValues] = useState({});

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setFormValues(res.data))
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(id);
  }, []);

  const onSubmit = () => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formValues)
      .then(res => {
        console.log(res.data);
        
        setMovieList(currentMovieList => {
          return currentMovieList.map(movie => {
            if (movie.id === parseInt(id)) {
              return res.data;
            }
            return movie
          });
        });
        history.push("/");
      })
      .catch(err => {
        debugger;
      });
  };

  const changeHandler = inputType => e => {
    const inputValue = e.target.value;
    setFormValues({
      ...formValues,
      [inputType]: inputValue
    });
  };

  return (
    <form>
      <label>Title: </label>
      <input onChange={changeHandler("title")} value={formValues.title} />
      <label>Director: </label>
      <input onChange={changeHandler("director")} value={formValues.director} />
      <button type="button" onClick={onSubmit}>
        Submit
      </button>
    </form>
  );
}
