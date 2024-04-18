import React from 'react';
import { useNavigate } from 'react-router-dom';

function PostCard({ text, author, time, link }) {
    const navigate = useNavigate();

    return (
        <div className="card text-center post-card">
            <div className="post-header card-header">
                <a onClick={() => navigate('/user/' + `${link}`)}> {author}</a>
            </div>
            <div className="card-body">
                <p className="card-text">{text}</p>
            </div>
            <div class="card-footer text-body-secondary">
                Likes | Comments
                <br />
                (coming soon)
            </div>
        </div>
    );
}

export default PostCard;
