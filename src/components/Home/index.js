import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import {IoWarning} from 'react-icons/io5'
import Cookies from 'js-cookie'
import Carousel from '../Carousel'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const loadingState = {
  initial: 'INITIAL',
  inprocess: 'INPROCESS',
  completed: 'COMPLETED',
  failure: 'FAILURE',
}
const Home = () => {
  const [tendingList, setTrendingList] = useState(null)
  const [originalList, setOriginalList] = useState(null)
  const [mainPoster, setPoster] = useState(null)
  const [trendingLoader, setTrendingLoader] = useState(loadingState.initial)
  const [originalLoader, setOriginalLoader] = useState(loadingState.initial)
  const [bannerLoader, setBannerLoader] = useState(loadingState.initial)
  function updateData(data) {
    return {
      backdropPath: data.backdrop_path,
      id: data.id,
      overview: data.overview,
      posterPath: data.poster_path,
      title: data.title,
    }
  }
  const callTrendingAPI = async () => {
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const responseTrending = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
      options,
    )

    if (responseTrending.status) {
      const trendingData = await responseTrending.json()
      console.log(trendingData)
      const {results} = trendingData
      const updatedTrendingList = results.map(trnd => updateData(trnd))

      setTrendingList(updatedTrendingList)
      setTrendingLoader(loadingState.completed)
    } else {
      setTrendingLoader(loadingState.failure)
    }
  }
  // FOR BANNER SECTION
  const callBannerSection = async () => {
    // SELECT RANDOM MOVIE
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const bannerRsp = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      options,
    )
    //  UPDATING ORGINAL MOVIE DATA
    if (bannerRsp.status) {
      const bannerData = await bannerRsp.json()
      console.log(bannerData)
      const {results} = bannerData
      const updatedBannerData = results.map(trnd => updateData(trnd))
      const randomIndex = Math.floor(Math.random() * 3)
      setPoster(updatedBannerData[randomIndex])
      setBannerLoader(loadingState.completed)
    } else {
      setBannerLoader(loadingState.failure)
    }
  }
  //  calling API for ORIGINALS OPTIONS
  const callOriginalsAPI = async () => {
    // CALL API ORIGINAL
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const orginalRsp = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      options,
    )

    //  UPDATING ORGINAL MOVIE DATA
    if (orginalRsp.status) {
      const orgiData = await orginalRsp.json()
      console.log(orgiData)
      const {results} = orgiData
      const updatedOriData = results.map(trnd => updateData(trnd))
      setOriginalList(updatedOriData)
      setOriginalLoader(loadingState.completed)
    } else {
      setOriginalLoader(loadingState.failure)
    }
  }

  //  CALLING INITIAL API USING API WHEN PAGE LOADED
  useEffect(() => {
    // SETTING LOADER FOR TRENDING MOVIE OPTIONS
    setTrendingLoader(loadingState.inprocess)
    setOriginalLoader(loadingState.inprocess)
    setBannerLoader(loadingState.inprocess)

    callBannerSection()
    //  CALLING FUNCTION FOR TRENDING MOVIES OPTIONS
    callTrendingAPI()
    //  CALLING FUNCTION FOR ORIGINAL MOVIES OPTIONS
    callOriginalsAPI()
    //  CALLING FUNCTION
  }, [])

  // FOR TRENDING MOVIES ----> SUCCESS
  const onTrendingAPISuccess = <Carousel data={tendingList} />

  // FOR API MOVIES -----> FAILURE
  const apiFailure = callAPI => (
    <div className="home-api-failure">
      <IoWarning className="react-icons" />
      <p className="api-failure-cap">Something went wrong. Please try again</p>
      <button onClick={callAPI} type="button" className="api-failure-btn">
        Try Again
      </button>
    </div>
  )
  const onCarouselLoading = (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  //  SWITCH CASES FOR TRENDING MOVIES -- API CALL
  const trendingSection = () => {
    switch (trendingLoader) {
      case loadingState.inprocess:
        return onCarouselLoading
      case loadingState.completed:
        return onTrendingAPISuccess
      case loadingState.failure:
        return apiFailure(callTrendingAPI)
      default:
        return null
    }
  }

  const onOriginalAPISuccess = <Carousel data={originalList} />
  const originalSection = () => {
    switch (originalLoader) {
      case loadingState.inprocess:
        return onCarouselLoading
      case loadingState.completed:
        return onOriginalAPISuccess
      case loadingState.failure:
        return apiFailure(callOriginalsAPI)
      default:
        return null
    }
  }

  const onBannerCompleted = () => {
    const {posterPath, title, overview} = mainPoster
    return (
      <div className="banner-container">
        <img className="banner-poster" src={posterPath} />
        <Header />
        <div className="banner-content">
          <h1 className="banner-heading">{title}</h1>
          <p className="banner-descp">{overview}</p>
          <button className="banner-btn" type="button">
            Play
          </button>
        </div>
      </div>
    )
  }

  const onBannerLoading = (
    <div className="banner-container">
      <Header />
      {onCarouselLoading}
    </div>
  )

  const onBannerFailure = (
    <div className="banner-container">
      <Header />
      {apiFailure(callBannerSection)}
    </div>
  )

  const bannerSection = () => {
    switch (bannerLoader) {
      case loadingState.inprocess:
        return onBannerLoading
      case loadingState.completed:
        return onBannerCompleted()
      case loadingState.failure:
        return onBannerFailure
      default:
        return null
    }
  }
  // FINAL RETURN FUNCTION
  return (
    <div className="home-container">
      {bannerSection()}
      <div className="bottom-container">
        <h1 className="bottom-heading">Trending Now</h1>
        <div className="carousel-container">{trendingSection()}</div>
        <h1 className="bottom-heading">Originals</h1>
        <div className="carousel-container">{originalSection()}</div>
      </div>
      <Footer />
    </div>
  )
}
export default Home
