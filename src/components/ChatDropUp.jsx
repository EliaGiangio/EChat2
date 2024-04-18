import React, { useState, useEffect } from 'react';
import { getDatabase, ref, child, get, set } from "firebase/database";
import ChatArea from './ChatArea';
import app from '../firebase';
import { useAuth } from '../AuthContext';

export default function ChatDropUp() {
    const { user } = useAuth();
    const [otherUsers, setOtherUsers] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users')).then((snapshot) => {
            if (snapshot.exists()) {
                setOtherUsers(Object.values(snapshot.val()));
            } else {
                setOtherUsers(['me', 'you']); // Placeholder users for testing
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    function chatExists(chatNumber) {
        const chatRef = ref(getDatabase(), 'chats');
        return get(child(chatRef, chatNumber))
            .then((snapshot) => snapshot.exists())
            .catch((error) => {
                console.error("Error fetching data:", error);
                return false;
            });
    }

    function openChat(receiver) {
        const chatIdGenerator = user.uid + receiver.user_id;
        const chatId = chatIdGenerator.split('').sort().join('');
        chatExists(chatId).then((exists) => {
            if (!exists) {
                const newChatRef = ref(getDatabase(), 'chats/' + chatId);
                set(newChatRef, {
                    firstUser: user.email,
                    secondUser: receiver.email,
                    messages: {}
                }).then(() => {
                    setCurrentChatId(chatId);
                }).catch((error) => {
                    console.error("Error setting chat entry:", error);
                });
            } else {
                setCurrentChatId(chatId);
            }
        });
    }


    return (
        <>
            <div className="btn-group dropup chat-drop-up">
                <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Friends
                </button>
                <ul className="dropdown-menu chat-drop-up-elements">
                    {otherUsers.map((otherUser, index) => (
                        otherUser.email !== user.email
                        &&
                        <li key={index}>
                            <button className="btn btn-outline-success list-friend-single" onClick={() => openChat(otherUser)}>{otherUser.username}</button>
                        </li>
                    ))}
                </ul>
            </div>
            {currentChatId && <ChatArea chatId={currentChatId} setCurrentChatId={setCurrentChatId} />}
        </>
    );
}
