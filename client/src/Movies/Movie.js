import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieForm from './MovieForm'
import MovieCard from './MovieCard';

function Movie({ addToSavedList, movieList, setMovieList, getMovieList }) {
  const history = useHistory()
  const [movie, setMovie] = useState(null);

  const match = useRouteMatch();



  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  // const routeToEditForm = () => {
  //   history.push(`/update-movie/${movie.id}`)
  // }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} movieList={movieList} getMovieList={getMovieList} setMovieList={setMovieList} addToSavedList={saveMovie} />
    </div>
  );
}

export default Movie;
