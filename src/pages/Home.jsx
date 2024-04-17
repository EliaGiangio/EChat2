import PostCard from "../components/PostCard"
import ChatDropUp from "../components/ChatDropUp";
import NewPost from "../components/NewPost";
import { useAuth } from '../AuthContext';
import { useState, useEffect } from "react";
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";

export default function Home() {
    const { user } = useAuth();
    const database = getDatabase()
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const postsRef = ref(database, 'posts/');
        onValue(postsRef, (snapshot) => {
            if (snapshot.exists()) {
                setAllPosts(Object.values(snapshot.val()));
            } else {
                setAllPosts([]);
            }
        });
    }, []);


    function submitPost(post) {
        const postId = (Date.now()) + (Math.floor(Math.random() * 10000));
        const postRef = ref(database, 'posts/' + postId);
        set(postRef, {
            author: user.email,
            author_id: user.uid,
            content: post,
            send_time: Date.now()
        }).then(() => {
            setAllPosts([...allPosts, { author: author, content: post }]);
            console.error(allPosts);
        }).catch((error) => {
            console.error("Error posting:", error);
        });
    }
    return (
        <>
            <div className="container-lg">
                <NewPost onSubmitPost={submitPost} />
                <div className="all-posts">
                    {allPosts.map((post, index) => (
                        <div key={index}>
                            <PostCard text={post.content} author={post.author} time={post.send_time} link={post.author_id} />
                        </div>
                    ))}
                </div>
            </div>
            <>
                <ChatDropUp />
            </>
        </>
    )
};