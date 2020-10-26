import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Row.css'

const baseUrl = 'https://image.tmdb.org/t/p/original'

const Row = ({ title, fetchUrl, isLarge }) => {

  const [movies, setMovies] = useState([])

  // A snippet of code which runs based on a specific condition
  useEffect(() => {
    // if [], run once when the row loads, and dont run again, if we pull f.e. [movies], it's called depensensies and it will reloaded everytime when movies changed
    const fetchDate = async () => {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results);
      return request
    }
    fetchDate()
  }, [fetchUrl])

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {
          movies.map(movie => (
            <img
              key={movie.id}
              className={`row__poster ${isLarge && 'row__poster--large'}`}
              src={`${baseUrl}${isLarge ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
            />
          ))
        }
      </div>
      {/* container -> posters */}
    </div>
  )
}

export default Row
