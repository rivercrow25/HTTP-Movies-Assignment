import React from 'react';
import { useHistory } from 'react-router-dom'
import Axios from 'axios';

const MovieCard = props => {
  const history = useHistory()
  const { title, director, metascore, stars, id } = props.movie;

  const routeToForm = () => {
    history.push(`/update-movie/${id}`)
  }

  const deleteMovie = () => {
    Axios.delete(`http://localhost:5000/api/movies/${props.movie.id}`)
      .then(res => {
        props.setMovieList(props.movieList.filter(item => item !== props.movie))
        history.push('/')
        props.getMovieList()
      })
      .catch(err => console.log(err))
  }

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
      <div className='save-button' onClick={props.saveMovie}>
        Save
      </div>
      <button type='button' onClick={() => routeToForm()}>Edit</button>
      <button type='button' onClick={deleteMovie}>delete</button>
    </div>
  );
};

export default MovieCard;
