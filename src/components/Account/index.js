import Cookies from 'js-cookie'
import {Redirect, withRouter} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const onLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
    return <Redirect to="/login" />
  }
  return (
    <div className="account-container">
      <Header />
      <div className="account-details">
        <h1 className="acccount-details-title">Account</h1>
        <hr className="break-line" />
        <div className="account-options-container">
          <h1 className="account-options-title">Membership</h1>
          <div className="options-values">
            <p className="options-val-1">rahul@gmail.com</p>
            <p className="options-val-pass">Password : ************</p>
          </div>
        </div>
        <hr className="break-line" />
        <div className="account-options-container">
          <h1 className="account-options-title">Plans</h1>
          <div className="options-values options-2">
            <p className="options-val-1 ">Premium</p>
            <button className="options-plan">Ultra HD</button>
          </div>
        </div>
        <hr className="break-line" />
      </div>
      <button className="logout-btn" onClick={onLogOut}>
        Logout
      </button>
      <Footer />
    </div>
  )
}
export default withRouter(Account)
