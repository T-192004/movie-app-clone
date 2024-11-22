// import {useState, useEffect} from 'react'
// import Cookie from 'js-cookie'
// // import {BannerContainer} from '../styledComponents'
// import Header from '../Header'
// import './index.css'

// const MovieDetails = props => {
//   const [movieDetail, setMovieDetail] = useState([])
//   const [similarMovies, setSimilarMovie] = useState([])

//   function updateMovieDetail(each) {
//     return {
//       adult: each.adult,
//       backdropPath: each.backdrop_path,
//       budget: each.budget,
//       genres: each.genres,
//       id: each.id,
//       overview: each.overview,
//       posterPath: each.poster_path,
//       releaseDate: each.release_date,
//       runtime: each.runtime,
//       spoken_languages: each.spoken_languages.map(lang => ({
//         id: lang.id,
//         englishName: lang.english_name,
//       })),
//       title: each.title,
//       voteAverage: each.vote_average,
//       voteCount: each.vote_count,
//     }
//   }
//   function updateSimilarMovie(simMovie) {
//     return {
//       backdropPath: simMovie.backdrop_path,
//       id: simMovie.id,
//       overview: simMovie.overview,
//       posterPath: simMovie.poster_path,
//       title: simMovie.title,
//     }
//   }
//   useEffect(async () => {
//     const {match} = props
//     const {params} = match
//     const {id} = params
//     const token = Cookie.get('jwt_token')
//     const options = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//     const movieDetailApi = `https://apis.ccbp.in/movies-app/movies/${id}`
//     const response = await fetch(movieDetailApi, options)
//     const data = await response.json()
//     const updatedMovie = updateMovieDetail(data.movie_details)
//     const similarMovie = data.movie_details.similar_movies.map(simMovie =>
//       updateSimilarMovie(simMovie),
//     )
//     setMovieDetail(updatedMovie)
//     setSimilarMovie(similarMovie)
//   }, [])
//   return (
//     <div className="movie-details-container">
//          <div className="banner-container">
//              <img className="banner-poster" src={mainPoster.posterPath} />
//              <Header />
//              <div className="banner-content">
//                  <h1 className="banner-heading">{mainPoster.title}</h1>
//                  <p className="banner-descp">{mainPoster.overview}</p>
//                   <button className="banner-btn" type="button">
//                      Play
//                  </button>
//              </div>
//          </div>
//          <div className="bottom-container">
//          </div>
//     </div>
//   )
// }

// export default MovieDetails
