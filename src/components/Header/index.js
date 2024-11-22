import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
// import {CgProfile} from 'react-icons/cg'
import './index.css'

const Header = props => (
  <nav className="navbar">
    <ul className="navbar-list">
      <Link to="/">
        <img
          className="navbar-logo"
          src="https://i.postimg.cc/JzTsYBN6/Group-7399.png"
          alt="website logo"
        />
      </Link>
      <div className="navbar-left">
        <Link className="link-item" to="/">
          <li className="navbar-list-item">Home</li>
        </Link>
        <Link className="link-item" to="/popular">
          <li className="navbar-list-item">Popular</li>
        </Link>
      </div>
      <div className="navbar-right">
        <Link className="link-item" to="/search">
          <li className="navbar-list-item">
            {props.searchRoute ? (
              <div className="search-box">
                <input
                  className="input-box"
                  type="text"
                  onChange={e => {
                    props.setSearchInput(e.target.value)
                  }}
                />
                <div className="search-icon-container">
                  <FaSearch className="search-icon" />
                </div>
              </div>
            ) : (
              <FaSearch className="navbar-icon" />
            )}
          </li>
        </Link>
        <Link className="link-item" to="/account">
          <li className="profile-icon">
            <img
              src="https://res.cloudinary.com/dxkjmlrfk/image/upload/v1728263160/Avatar_yxua4u.png"
              alt="account"
              className="navbar-icon"
            />
          </li>
        </Link>
      </div>
    </ul>
  </nav>
)

export default Header
