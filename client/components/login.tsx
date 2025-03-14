import React from 'react';
import '../assets/styles.css'

const Login = () => {
  return (
    <div className='login'>
        <form className='loginForm'>
            <input type='text' placeholder='Username'/>
            <input type='text' placeholder='Password'/>
            <input id="loginButton" type='submit' value='Login'/>
        </form>
    </div>
  )
};

export default Login;