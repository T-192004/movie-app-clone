import {useState, useEffect} from 'react'
import Cookie from 'js-cookie'
import Header from '../Header'
import MovieCard from '../MovieCard'
import './index.css'

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchResponsesArr, setSearchResponses] = useState([])
  useEffect(async () => {
    const token = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`,
      options,
    )

    if (response.status) {
      setSearchResponses([])
    } else {
      const responseSearch = await response.json()
      const updatedSearchRepsonse = responseSearch.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
      }))
      setSearchResponses(updatedSearchRepsonse)
    }
  }, [searchInput])

  const onEmptySearch = (
    <div className="empty-search">
      <img
        className="empty-search-img"
        src="https://res.cloudinary.com/dxkjmlrfk/image/upload/v1728262827/Group_7394_vaequv.png"
        alt="no results"
      />
      <p className="empty-search-cap">
        Your search for {searchInput} did not find any matches.
      </p>
    </div>
  )
  return (
    <div className="search-container">
      <Header searchRoute setSearchInput={setSearchInput} />
      <ul className="search-responses">
        {searchResponsesArr.length === 0
          ? onEmptySearch
          : searchResponsesArr.map(movie => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
      </ul>
    </div>
  )
}

export default Search
