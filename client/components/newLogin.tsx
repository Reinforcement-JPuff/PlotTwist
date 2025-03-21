import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { newLogin } from '../loginSlice';
import { useNewUserMutation } from '../features/apiSlice';
// import * as actions from '../store/authActions';
// import * as actions from [put file path to Redux actions];

const NewLogin: React.FC = () => {
    const dispatchNewUser = useDispatch<AppDispatch>();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatchNewUser(newLogin({ username, password }));
        
        setUsername('');
        setPassword('');
    };

    const navigate = useNavigate();

    const handleBackClick= (e: any) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className = 'newLogin'>
            <button className='backButton' onClick={handleBackClick}>Back</button>
            <form className = 'newLoginForm' /*onSubmit*/>
                <input type='text' placeholder='Enter New Username' onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' placeholder='Enter New Password' onChange={(e) => setPassword(e.target.value)}/>
                <button id='newLoginButton' type='submit'>Create Account</button>
            </form>
        </div>
    )
}

export default NewLogin
