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
        <div className='new-post-element'>
            <h1>What's on your mind?</h1>
            <form onSubmit={handleSubmit}>
                <textarea className='form-control' value={post} onChange={handlePostChange} />
                <button className='btn btn-success' type="submit">SHARE</button>
            </form>
        </div>

    );
}
