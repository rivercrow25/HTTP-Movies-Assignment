import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from './Movies/MovieForm'
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [update, setUpdate] = useState(false)

  const toggleUpdate = () => {
    setUpdate(!update)
  }

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

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} getMovieList={getMovieList} setMovieList={setMovieList} movieList={movieList} movieList={movieList} />
      </Route>

      <Route path='/update-movie' />
      <Route path='/update-movie/:id' render={props => (
        <MovieForm {...props} movieList={movieList} getMovieList={getMovieList} toggleUpdate={toggleUpdate} setMovieList={setMovieList} />
      )} />
    </>
  );
};

export default App;
