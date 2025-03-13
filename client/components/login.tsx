import React from 'react';

const Login = () => {
  return (
    <div className='login'>
        <form className='loginForm'>
            <input type='text' placeholder='Username'/>
            <input type='text' placeholder='Password'/>
            <input type='submit' value='Login'/>
        </form>
    </div>
  )
};

export default Login;