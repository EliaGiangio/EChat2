import React from 'react';
import { useNavigate } from 'react-router-dom';

function PostCard({ text, author, time, link }) {
    const navigate = useNavigate();

    return (
        <div className="card text-center post-card">
            <div className="card-header">
                <a onClick={() => navigate('/user/' + `${link}`)}> {author}</a>
            </div>
            <div className="card-body">
                <h5 className="card-title"> {text}</h5>
                <p className="card-text">Post content</p>
            </div>
            <div className="card-footer text-body-secondary">
                {time}
            </div>
        </div>
    );
}

export default PostCard;
