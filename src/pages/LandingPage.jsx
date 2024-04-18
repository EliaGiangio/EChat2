import React, { useState } from 'react';
import SignUp from '../components/SignUp';
import Login from '../components/LogIn';

export default function LandingPage() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLoginMessage, setShowLoginMessage] = useState(false);

    const toggleSignUp = () => {
        setShowSignUp(!showSignUp);
        setShowLoginMessage(true);
    };

    const toggleLogin = () => {
        setShowSignUp(false);
        window.location.reload();
    };

    return (
        <div className='container-landing'>
            <h1>EChat</h1>
            <div className='landing-card'>
                {showSignUp && <SignUp />}
                {showLoginMessage || <Login />}
                {showLoginMessage ? (
                    <p>Already a member? <button className='btn btn-outline-info' onClick={toggleLogin}>Login</button></p>
                ) : (
                    <p>Not yet a member? Then <button className='btn btn-outline-info' onClick={toggleSignUp}>Sign Up</button></p>
                )}
            </div>
        </div>
    );
}
