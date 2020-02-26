import React, { useState } from "react";

export default function AddForm({setMovieList}) {
    const [formValues, setFormValues] = useState({
        id: NaN,
        title: "",
        director: "",
        metascore: "",
        stars: [],
        starInput: "",
    })
  const addMovie = () => {
    setMovieList(movieList => {
        return movieList.concat({
            ...formValues,
            id: movieList.length + 1
            
        })
    })
  };
  const changeHandler = inputType => e => {
    const inputValue = e.target.value;
    setFormValues({
        ...formValues,
        [inputType]: inputValue,
    })
  }
  const addStar = () => {
    setFormValues({
        ...formValues,
        stars: formValues.stars.concat(formValues.starInput),
        starInput: ""
    })
  }

  return (
    <form>
      <label>Title: </label>
      <input onChange={changeHandler("title")} value={formValues.title}/>
      <label>Director: </label>
      <input onChange={changeHandler("director")} value={formValues.director}/>
      <label>Metascore: </label>
      <input type="number" onChange={changeHandler("metascore")} value={formValues.metascore}/>
      <label>Actors: </label>
      <input onChange={changeHandler("starInput")} value={formValues.starInput} />
      <button type="button" onClick={addStar}>ADD ACTOR</button>
      <button type="button" onClick={addMovie}>ADD</button>
      {formValues.stars.map(star => {
          return(
          <div>{star}</div>
          )
      })}
    </form>
  );
}
