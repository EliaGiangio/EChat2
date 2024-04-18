import React, { useState } from 'react';

export default function ChangeUsername({ onSubmitUsername }) {
    const [username, setUsername] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitUsername(username);
        setUsername('');
    };

    return (
        <div className='change-username-element'>
            <form onSubmit={handleSubmit}>
                <input className='input-fields form-control' value={username} onChange={handleUsernameChange} />
                <button className='btn btn-success' type="submit">Change</button>
            </form>
        </div>
    );
}
