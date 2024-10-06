import React, { useEffect, useState } from 'react';
import ChatService from './ChatService';

interface ChatMessage {
  senderId: string;
  receiverId: string;
  message: string;
}

interface ChatComponentProps {
  userId: string;
  receiverId: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');

  useEffect(() => {
    ChatService.connect(userId, (newMessage: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      ChatService.disconnect();
    };
  }, [userId]);

  const handleSendMessage = () => {
    const chatMessage: ChatMessage = {
      senderId: userId,
      receiverId: receiverId,
      message: messageInput,
    };

    // Cập nhật state với tin nhắn mới gửi
    setMessages((prevMessages) => [...prevMessages, chatMessage]);

    // Gửi tin nhắn qua WebSocket
    ChatService.sendMessage(chatMessage);
    setMessageInput('');
  };

  return (
    <div>
      <div>
        <h2>Chat Messages</h2>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <input
        type='text'
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder='Type your message'
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
