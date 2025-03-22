import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { newLogin } from '../loginSlice';
import { useNewUserMutation } from '../features/apiSlice';
// import * as actions from '../store/authActions';
// import * as actions from [put file path to Redux actions];

const NewLogin = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [createUser, { isLoading, isError, error }] = useNewUserMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
 
        try {
            const response = await createUser({ username, password }).unwrap();
      
            // Dispatch to Redux state (optional)
            dispatch(newLogin({ username, password }));
      
            // Reset form
            setUsername('');
            setPassword('');
      
            // Optionally redirect to login page
            alert(response.message || "Account created!");
            navigate('/');
          } catch (err) {
            console.error('Signup failed:', err);
          }
        };
      
        const handleBackClick = (e: React.MouseEvent) => {
          e.preventDefault();
          navigate('/');
        };
      
        return (
            <div className='newLogin'>
              <button className='backButton' onClick={handleBackClick}>Back</button>
        
              <form className='newLoginForm' onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='Enter New Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type='password'
                  placeholder='Enter New Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button id='newLoginButton' type='submit' disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Account'}
                </button>
        
                {isError && <p style={{ color: 'red' }}>Signup failed. Try again.</p>}
              </form>
            </div>
          );
        }

export default NewLogin
