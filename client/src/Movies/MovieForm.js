import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const MovieForm = props => {
    console.log(props)
    const history = useHistory()
    const { id } = useParams()
    const [currentMovie, setCurrentMovie] = useState({
        id: null,
        title: '',
        director: '',
        metascore: null,
        stars: [],
    })

    useEffect(() => {
        const movieToUpdate = props.movieList.find(item => `${item.id}` === id)
        if (movieToUpdate) {
            setCurrentMovie(movieToUpdate)
        }
    }, [props.movieList, id])

    const handleSubmit = event => {
        event.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, currentMovie)
            .then(res => {
                console.log(res)
                history.push(`/`)
                props.getMovieList()
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' placeholder={currentMovie.title} />

            <label htmlFor='director'>Director</label>
            <input type='text' id='director' name='director' placeholder={currentMovie.director} />

            <label htmlFor='metascore'>Metascore</label>
            <input type='number' id='metascore' name='metascore' placeholder={currentMovie.metascore} />

            <button type='submit'>Edit</button>
        </form>
    )
}

export default MovieForm