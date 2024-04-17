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
        <form onSubmit={handleSubmit}>
            <textarea value={username} onChange={handleUsernameChange} />
            <button type="submit">Change</button>
        </form>
    );
}
