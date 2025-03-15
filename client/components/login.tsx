import React from 'react';
import '../assets/styles.css'

const Login = () => {
  return (
    <div className='login'>
        <form className='loginForm'>
            <input type='text' placeholder='Username'/>
            <input type='text' placeholder='Password'/>
            <input className="loginButton" id="signUpSubmit" type='submit' value='SignUp'/>
            <input className="loginButton" id="loginSubmit" type='submit' value='Login'/>
        </form>
    </div>
  )
};

export default Login;