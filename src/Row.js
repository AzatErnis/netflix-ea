import React, { useEffect, useState } from 'react'
import axios from './axios'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import './Row.css'

const baseUrl = 'https://image.tmdb.org/t/p/original'

const Row = ({ title, fetchUrl, isLarge }) => {

  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("")

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

  console.log(movies)

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  }

  const handleClick = movie => {
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.title || movie?.name || movie.original_name || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v'))
        }).catch(err => console.log(err))
    }
  }

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {
          movies.map(movie => (
            <img
              className={`row__poster ${isLarge && 'row__poster--large'}`}
              onClick={() => handleClick(movie)}
              key={movie.id}
              src={`${baseUrl}${isLarge ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
            />
          ))
        }
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
