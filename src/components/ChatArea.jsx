import ChatBubble from "./ChatBubble";
import MessageCreation from "./MessageCreation";
import { useState, useEffect } from "react";
import { useAuth } from '../AuthContext';
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";



export default function ChatArea({ chatId, setCurrentChatId }) {
    const { user } = useAuth();
    const [allMessages, setAllMessages] = useState([]);
    const [friend, setFriend] = useState('');
    const dbRef = ref(getDatabase());
    const database = getDatabase();


    useEffect(() => {
        get(child(dbRef, 'chats/' + chatId)).then((snapshot) => {
            const chatData = snapshot.val();
            const friend = chatData.firstUser !== user.email ? chatData.firstUser : chatData.secondUser;
            setFriend(friend);
        }).catch((error) => {
            console.error(error);
        });
    }, [chatId]);



    useEffect(() => {
        const conversationRef = ref(database, 'chats/' + chatId + '/messages');
        onValue(conversationRef, (snapshot) => {
            if (snapshot.exists()) {
                setAllMessages(Object.values(snapshot.val()));
            } else {
                setAllMessages([]);
            }
        });
    }, [chatId]);


    function closeChat() {
        setCurrentChatId(null);
    }

    function sendMessage(message) {
        const senderText = user.email;
        const messageId = Date.now();
        const chatRef = ref(getDatabase(), 'chats/' + chatId + '/messages/' + messageId);
        set(chatRef, {
            sender: senderText,
            content: message,
            send_time: Date.now()
        }).then(() => {
            setAllMessages([...allMessages, { sender: senderText, content: message }]);
            console.error(allMessages);
        }).catch((error) => {
            console.error("Error sending message:", error);
        });
    }


    return (
        <div className="container-md chat-area">
            <div className="chat-area-username" >{friend}<button onClick={closeChat} ><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
            </button></div>
            <div className="conversation-area">
                {allMessages.map((message, index) => (
                    <div key={index} className="convo-container">
                        <ChatBubble sender={message.sender === user.email ? "currentUser" : "nope"} message={message.content} />
                    </div>
                ))}
            </div>
            <div className="message-creation-area">
                <MessageCreation onSendMessage={sendMessage} />
            </div>
        </div>
    );
}

