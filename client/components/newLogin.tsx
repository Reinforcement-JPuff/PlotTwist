import React from 'react';
import '../assets/styles.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
//import * as actions from '../store/authActions';
// import * as actions from [put file path to Redux actions];

const NewLogin: React.FC = () => {
    const dispatchNewUser = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your form handling logic here
        
    };

    return (
        <div className = 'newLogin'>
            <form className = 'newLoginForm' /*onSubmit*/>
                <input type='text' placeholder='Enter New Username'/>
                <input type='password' placeholder='Enter New Password'/>
                <button id='newLoginButton' type='submit'>Create Account</button>
            </form>
        </div>
    )
}

export default NewLogin
