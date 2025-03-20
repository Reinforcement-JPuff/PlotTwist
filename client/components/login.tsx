import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles.css';
//import * as actions from [put file path to Redux actions];

const Login: React.FC = () => {
  
  const navigate = useNavigate();

  const handleSignUpClick = (e: any) => {
    e.preventDefault();
    navigate('/newLogin');
  };

  const handleLoginClick = (e: any) => {
    e.preventDefault();
    navigate('/home');
  }

  return (
    <div className='login'>
        <h1 className='title'>PlotTwist</h1>
        <form className='loginForm'>
            <input type='text' placeholder='Username'/>
            <input type='password' placeholder='Password'/>
            <button className="loginButton" id="signUpSubmit" type='submit' value='SignUp' onClick={handleSignUpClick}/>
            <button className="loginButton" id="loginSubmit" type='submit' value='Login' onClick={handleLoginClick}/>
        </form>
    </div>
  )
};

export default Login;