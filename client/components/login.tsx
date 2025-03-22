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
      alert('Invalid credentials. Please enter a valid username and password.')
      console.error('Failed to login:', error)
    }
  }
  
  const handleSignUpClick = (e: any) => {
    e.preventDefault();
    navigate('/newLogin');
  };
    
  return (
    <form className="loginForm" onSubmit={handleLoginClick} style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      /><br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      /><br />
      <button className="loginButton" type="submit" disabled={isLoading}>Login</button>

      {isError && <p style={{ color: "red" }}>Login failed</p>}

      <p>Don't have an account?</p>
      <button className="loginButton" onClick={handleSignUpClick} type="button">
        Sign Up
      </button>
    </form>
  );
};

export default Login;