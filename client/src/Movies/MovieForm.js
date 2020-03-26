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
        console.log(currentMovie)
        event.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, currentMovie)
            .then(res => {
                console.log(res)
                props.getMovieList()
                history.push(`/`)

            })
            .catch(err => console.log(err.response))
    }

    const handleChange = event => {
        setCurrentMovie({ ...currentMovie, [event.target.name]: event.target.value })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' placeholder={currentMovie.title} onChange={handleChange} />

            <label htmlFor='director'>Director</label>
            <input type='text' id='director' name='director' placeholder={currentMovie.director} onChange={handleChange} />

            <label htmlFor='metascore'>Metascore</label>
            <input type='number' id='metascore' name='metascore' placeholder={currentMovie.metascore} onChange={handleChange} />

            <button type='submit'>Edit</button>
        </form>
    )
}

export default MovieForm