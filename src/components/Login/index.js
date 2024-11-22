import {useState} from 'react'
import Cookie from 'js-cookie'
import {withRouter, Redirect} from 'react-router-dom'
import './index.css'

const Login = props => {
  const [username, setUsername] = useState('') // SET USERNAME
  const [password, setPassword] = useState('') // SET PASSWORD
  const [error, setErrMsg] = useState('') // SET ERROR MSG

  const token = Cookie.get('jwt_token')
  if (token !== undefined) {
    return <Redirect to="/" />
  }
  // FOR SUCCESS LOGIN
  function onSuccess(jwtToken) {
    Cookie.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = props
    history.replace('/')
  }

  // FOR FAILURE LOGIN
  function onFailure(msg) {
    setErrMsg(msg)
  }
  // on clicking login button
  const onLogin = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      // IF TURE CALL ONSUCCESS FUNCTION
      onSuccess(data.jwt_token)
    } else {
      // IF FAIL CALL ONFAILURE FUNCTION
      onFailure(data.error_msg)
    }
  }
  // Return the JSX HTML
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={onLogin}>
          <div className="input-container">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input-box"
              id="username"
              placeholder="Enter Username"
              type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input-box"
              id="password"
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          {error.length !== 0 && <p className="error-msg">*{error}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default withRouter(Login)
