import React, {useState} from "react";

const Chat = (props) => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const {player} = props
    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setChatHistory([...chatHistory, { player, message }]);
            setMessage('');
        }
    };
    return (
        <div className="chat">
            <h3>Chat</h3>
            <div className="chat-history">
                {chatHistory.map((item, index) => (
                    <div key={index}>
                        <strong>{item.player}:</strong> {item.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}
export default Chat