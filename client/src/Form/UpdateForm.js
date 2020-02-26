import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";

export default function UpdateForm(props) {
  console.log(props);

  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  return (
    <form>
      <input />
    </form>
  );
}
