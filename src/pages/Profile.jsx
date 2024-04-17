import React, { useState, useEffect } from 'react';
import ChangeUsername from "../components/ChangeUsername"
import PostCard from "../components/PostCard"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, child, get, onValue, update } from 'firebase/database';

export default function Profile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const database = getDatabase();
    const dbRef = ref(getDatabase());
    const [user, setUser] = useState(null);
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        get(child(dbRef, 'users/' + id)).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        }).catch((error) => {
            console.error(error);
            setUser(null);
            setLoading(false);
        });
    }, [id, dbRef]);

    useEffect(() => {
        // Fetch posts data
        const postsRef = ref(database, 'posts/');
        onValue(postsRef, (snapshot) => {
            if (snapshot.exists()) {
                const postsData = snapshot.val();
                const filteredPosts = Object.values(postsData).filter(post => post.author_id === id);
                setAllPosts(filteredPosts);
            } else {
                setAllPosts([]);
            }
        });
    }, [database, id]);

    function updateUsername(username) {
        update(ref(database, 'users/' + id), {
            username: username
        });
        navigate("/")
    }

    return (
        <div className="container-lg">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1>{user ? user.username : 'User not found'}</h1>
                    <ChangeUsername onSubmitUsername={updateUsername} />
                    <div className="all-posts">
                        {allPosts.map((post, index) => (
                            <div key={index}>
                                <PostCard text={post.content} author={post.author} time={post.send_time} link={post.author_id} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
