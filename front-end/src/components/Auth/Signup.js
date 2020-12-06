import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

function Signup() {
  const { signup, currentUser, signOut } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  function insertGapiScript() {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js'
    script.onload = () => {
      initializeGoogleSignIn()
    }
    document.body.appendChild(script)
  }

  function initializeGoogleSignIn() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '309672869833-vqfh5su1urujn1g2om9auau8faamdcb0.apps.googleusercontent.com'
      })
      console.log('api inited');

      window.gapi.load('signin2', () => {
        const params = {
          scope: 'profile email',
          width: 240,
          height: 50,
          longtitle: true,
          theme: 'dark',
          onsuccess: async (googleUser) => {
            try {
              setError('')
              setLoading(true)
              await signup(googleUser)
            } catch (err) {
              setError('Failed to create an account')
            }
            setLoading(false)
          },
          onfailure: () => {
            console.log('failed to log in');
          }
        }
        window.gapi.signin2.render('googleLoginButton', params)
      })
    });
  }
  useEffect(() => {
    insertGapiScript()
  }, [])

  return (
    <>
      <div id="googleLoginButton" data-onsuccess="onSignIn"></div>
      <button onClick={signOut}>logOut</button>
    </>
  )
}

export default Signup
