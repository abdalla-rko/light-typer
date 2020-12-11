import React, { useContext, useState, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({})
  const [loading, setLoading] = useState(true)

  /* eslint-disable */
  async function signup(googleUser) {
    console.log('*********8 google');
    const id_token = googleUser.getAuthResponse().id_token;
    // sign up user with mongodb
    const response = await fetch('/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idtoken: id_token
      })
    })
    const data = await response.json();
    setCurrentUser(data)
    setLoading(false)
  }

  async function signupFB(facebookUser) {
    console.log('its working', facebookUser);
    const response = await fetch('/auth/facebook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(facebookUser)
    })
    const data = await response.json()
    setCurrentUser(data)
  }


  async function checkLoginStatus() {
    const response = await fetch('/auth/logged', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await response.json()
    console.log('data *********', data);
    setCurrentUser(data)
    setLoading(false)
    return data
  }

  async function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('logged out');
      // auth2.disconnect();
    });

    fetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => console.log(res.json()))
      .then(data => console.log(data))
      .catch(error => console.log('error', error))
      
    setLoading(false)
  }

  const value = {
    currentUser,
    checkLoginStatus,
    loading,
    signup,
    signupFB,
    signOut 
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
