import React, { useState } from 'react';

export default function MessageCreation({ onSendMessage }) {
    const [message, setMessage] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={message} onChange={handleMessageChange} />
            <button type="submit">S</button>
        </form>
    );
}
