export default function ChatBubble({ sender, message }) {
    const rightClass = sender !== 'currentUser' ? 'msg-sender bubble' : 'msg-receiver bubble';
    return (
        <>

            <div className={rightClass} >
                <p>{message}</p>
            </div>

        </>
    )
};