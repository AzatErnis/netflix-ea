import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from './axios'
import requests from './requests'

const baseUrl = 'https://image.tmdb.org/t/p/original'

const Banner = () => {

  const [movie, setMovie] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals)
      setMovie(request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
      ])
      return request
    }
    fetchData()
  }, [])

  const truncate = (str, n) => str?.length > n ? str.substr(0, n - 1) + "..." : str

  return (
    <header
      className="banner"
      style={{ backgroundImage: `url(${baseUrl}${movie?.backdrop_path})` }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__btns">
          <button className='banner__btn'>
            Play
          </button>
          <button className='banner__btn'>
            My List
          </button>
        </div>
        <h1 className="banner__descr">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fade-bottom"></div>
    </header>
  )
}

export default Banner
