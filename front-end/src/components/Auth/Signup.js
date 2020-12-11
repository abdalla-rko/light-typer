import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

function Signup() {
  const { signup, signupFB, currentUser, signOut } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [fbSdkLoaded, setFbSdkLoaded] = useState(false)
  const [isFacebookRendering, setIsFacebookRendering] = useState(true)

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

  function insertFacebookScript() {
    const script = document.createElement('script')
    const code = `
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '223851235777491',
        cookie     : true,
        xfbml      : true,
        version    : 'v9.0'
      });

      FB.Event.subscribe('xfbml.render', finished_rendering);
      FB.AppEvents.logPageView();
      checkLoginState()
    }

    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        console.log('resting', response)
        statusChangeCallback(response);
      });
    }

    function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
      if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        facebookAPI(response);  
      } else {  
        console.log('facebook error: not connected');  // Not logged into your webpage or we are unable to tell.
      }
    }
  
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function facebookAPI(response) {
      FB.api('/me?fields=email, name, id', function(response) {
        console.log('testing', response)
        const signup = ${signupFB} 
        signup(response)
      });
    }
    
    function finished_rendering() {
      ${setIsFacebookRendering(false)}
    }
    `

    script.appendChild(document.createTextNode(code))
    document.body.appendChild(script)
  }

  useEffect(() => {
    insertGapiScript()
    insertFacebookScript()
  }, [])

  return (
    <>
      <div className="signup-button" id="googleLoginButton" data-onsuccess="onSignIn"></div>
      {/* <button onClick={signOut}>logOut</button> */}
      <div id="spinner" className={`signup-button ${isFacebookRendering ? 'facebookButton' : ''}`}>
        { isFacebookRendering && 'Loading' }
          <div className="fb-login-button" data-onlogin="checkLoginState();" data-scope="public_profile" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width="240"></div>
      </div>
    </>
  )
}

export default Signup
