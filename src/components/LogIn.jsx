import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('lo123@mail.com');
    const [password, setPassword] = useState('lollo1234');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/');
        }
    };


    return (
        <>
            <div className="credentials-form">
                <form onSubmit={handleSubmit}>
                    <input className='input-fields form-control' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className='input-fields form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='btn btn-primary' type="submit">Enter</button>
                </form>
            </div>
        </>
    );
}
