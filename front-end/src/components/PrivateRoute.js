import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function PrivateRoute({ children, ...rest }) {
  const { checkLoginStatus } = useAuth()
  const [loggedIn, setLoggedIn] = useState(false)
  let logged = async() => {
    const data = await checkLoginStatus()
    setLoggedIn(data)
  }
  logged()
  return (
      <Route  {...rest} render={({ location }) => !loggedIn ? (children) : (
        <Redirect to={{
          pathname: "/",
          state: { from: location }
        }} />
      ) } />
  )
}

export default PrivateRoute
