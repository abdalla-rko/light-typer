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
    fetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => console.log(res.json()))
      .then(data => console.log(data))
      .catch(error => console.log('error', error))
    
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      // auth2.disconnect();
    });
    setLoading(false)
  }

  const value = {
    currentUser,
    checkLoginStatus,
    loading,
    signup,
    signOut 
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
