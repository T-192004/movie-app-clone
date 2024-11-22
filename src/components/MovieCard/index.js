import './index.css'

const MovieCard = props => {
  const {movie} = props
  const {backdropPath, title} = movie
  return (
    <li className="movie-card">
      <img className="movie-card-poster" src={backdropPath} alt={title} />
    </li>
  )
}

export default MovieCard
