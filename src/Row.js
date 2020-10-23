import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Row.css'

const baseUrl = 'https://image.tmdb.org/t/p/original'

const Row = ({ title, fetchUrl }) => {

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

  console.log(movies);

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className="row__posts">
        {
          movies.map(movie => (
            <img className='row__posts-img' src={`${baseUrl}${movie.poster_path}`} alt={movie.name} />
          ))
        }
      </div>
      {/* container -> posters */}
    </div>
  )
}

export default Row
