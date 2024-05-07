// MessageSuggestComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { getNameByEmail } from '../utils/userDetails';

const MessageSuggestComponent = ({ userResponse, callToPhoneNumber, sendbluePhoneNumber, setPhase }) => {
    const { currentUser } = useAuth();
    const [message, setMessage] = useState('');

    useEffect(() => {
        let defaultMessage = '';
        if (userResponse === "notAnswered") {
            const name = currentUser ? getNameByEmail(currentUser.email) : 'Guest';
            defaultMessage = `Hey! My name is ${name}. I help with the NIL Clubs. I saw you started to sign up but didn't finish. My job is to help you finish.`;
        } else if (userResponse === "answered") {
            defaultMessage = "Hey! Thanks for the time. If you or any of your teammates ever have any questions about the club hit me up. I'm here to help.";
        }
        setMessage(defaultMessage);
    }, [userResponse, currentUser]);

    const handleSendMessage = async () => {
        try {
            const response = await axios.post('/api/send-message', {
                phoneNumber: callToPhoneNumber,
                message,
                fromNumber: sendbluePhoneNumber
            });
            console.log("Message sent successfully:", response.data);
            setPhase('postCall');
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const handleSkip = () => {
        console.log("Skipping message sending.");
        setPhase('postCall');
    };

    return (
        <div>
            <h2>Message Suggestion</h2>
            <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                style={{ width: '100%', minHeight: '100px' }}
            />
            <button onClick={handleSendMessage}>Send Message</button>
            <button onClick={handleSkip}>Skip</button>
        </div>
    );
};

export default MessageSuggestComponent;
