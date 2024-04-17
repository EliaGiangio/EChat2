import React, { useState } from 'react';

export default function NewPost({ onSubmitPost }) {
    const [post, setPost] = useState('');

    const handlePostChange = (e) => {
        setPost(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitPost(post);
        setPost('');
    };

    return (
        <div>
            <h1>What's on your mind?</h1>
            <form onSubmit={handleSubmit}>
                <textarea value={post} onChange={handlePostChange} />
                <button type="submit">SHARE</button>
            </form>
        </div>

    );
}
