import React, { useContext, useState, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
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
  }

  const value = {
    currentUser,
    signup,
    signOut 
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
