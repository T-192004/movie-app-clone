import {useState, useEffect} from 'react'
import Cookie from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import MovieCard from '../MovieCard'
import './index.css'

const loadingState = {
  initial: 'INITIAL',
  inprocess: 'INPROCESS',
  completed: 'COMPLETED',
  failure: 'FAILURE',
}
const PopularMovies = () => {
  const [popularMovieArr, setPopularMovieArr] = useState([])
  const [popularMoviesLoading, setPopularMoviesLoading] = useState(
    loadingState.initial,
  )
  useEffect(async () => {
    setPopularMoviesLoading(loadingState.inprocess)
    const token = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      options,
    )

    if (response.status) {
      const popularMovieRepsone = await response.json()
      console.log(popularMovieRepsone)
      const updatePopularMovieRepsone = popularMovieRepsone.results.map(
        movie => ({
          id: movie.id,
          backdropPath: movie.backdrop_path,
          title: movie.title,
          posterPath: movie.poster_path,
        }),
      )
      setPopularMovieArr(updatePopularMovieRepsone)
      // console.log("Success")
      setPopularMoviesLoading(loadingState.completed)
    } else {
      // console.log("failure")
      setPopularMoviesLoading(loadingState.failure)
    }
  }, [])
  // function callCasesForPopularMovie() {
  //   switch (popularMoviesLoading) {
  //     case loadingState.failure:
  //       return null
  //       break
  //     case
  //   }
  // }
  return (
    <div className="popularMoviesContianer">
      <Header />
      <ul className="popular-movies-list">
        {popularMovieArr.map(movie => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default PopularMovies
