import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const Carousel = props => {
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
  }
  const {data} = props
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.map(eachdata => (
          // <Link to={`/movies/${eachdata.id}`}  className="link-item">
          <div className="item-container" key={eachdata.id}>
            <img
              className="item-poster"
              src={eachdata.posterPath}
              alt={eachdata.name}
            />
          </div>
          // </Link>
        ))}
      </Slider>
    </div>
  )
}

export default Carousel
