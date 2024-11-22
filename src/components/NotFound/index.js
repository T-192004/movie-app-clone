import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-title">Lost Your Way ?</h1>
    <p className="not-found-cap">
      we are sorry the page you requested could not be found <br />
      Please go back to the homepage.
    </p>
    <Link className="not-found-link" to="/">
      <button className="go-home-btn">Go to Home</button>
    </Link>
  </div>
)

export default NotFound
