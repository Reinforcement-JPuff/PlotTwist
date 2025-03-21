import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../loginSlice";
import { useLoginUserMutation } from "../features/apiSlice";
import '../assets/styles.css';
//import * as actions from [put file path to Redux actions];

const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, {isLoading, isError, error}] = useLoginUserMutation();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const handleLoginClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({username, password}).unwrap();
      console.log(res);
      
      dispatch(login({username, password}));
      
      navigate('/home');

    } catch (error) {
      console.error('Failed to login:', error)
    }
  }
  
  const handleSignUpClick = (e: any) => {
    e.preventDefault();
    navigate('/newLogin');
  };
    
  return (
    <div className='login'>
        <h1 className='title'>PlotTwist</h1>
        <form className='loginForm'>
            <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            <button className="loginButton" id="signUpSubmit" type='submit' onClick={handleSignUpClick}>Sign Up</button>
            <button className="loginButton" id="loginSubmit" type='submit' onClick={handleLoginClick}>Login</button>
        </form>
    </div>
  )
};

export default Login;