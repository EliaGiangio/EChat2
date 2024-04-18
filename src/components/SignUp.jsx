// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function validateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(input);
}

function validatePassword(input) {
    return input.length >= 6;
}

export default function SignUp() {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateEmail(email) || !validatePassword(password)) {
            alert("Wrong credentials. Make sure that the email is correct and the password is longer than 6 characters");
        } else {
            const success = await signup(email, password);
            if (success) {
                navigate('/');
            }
        }
    };



    return (
        <>
            <div className="credentials-form">
                <form onSubmit={handleSubmit}>
                    <input className='input-fields form-control' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className='input-fields form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='btn btn-primary' type="submit">Register</button>
                </form>
            </div >
        </>
    );
}
