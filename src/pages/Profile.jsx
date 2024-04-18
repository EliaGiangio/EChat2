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
    const [showChangeUsername, setShowChangeUsername] = useState(false); // Track whether to show ChangeUsername component

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
        <div className="container-lg profile-div">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <><div className='username-div'>
                    <h1>{user ? user.username : 'User not found'}</h1>
                    <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        onClick={() => setShowChangeUsername(true)}
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"
                        />
                    </svg>
                </div>
                    {showChangeUsername && <ChangeUsername onSubmitUsername={updateUsername} />}
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
