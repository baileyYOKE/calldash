// sendblueService.js
const axios = require('axios');
require('dotenv').config();

const sendMessage = async (phoneNumber, messageContent, fromNumber) => {
    const payload = {
        number: phoneNumber,
        content: messageContent,
        from_number: fromNumber  // Assuming this parameter is now correctly used
    };

    try {
        const response = await axios.post('https://api.sendblue.co/api/send-message', payload, {
            headers: {
                'SB-API-KEY-ID': process.env.SENDBLUE_API_KEY_ID,
                'SB-API-SECRET-KEY': process.env.SENDBLUE_API_SECRET_KEY,
                'Content-Type': 'application/json'
            }
        });

        console.log('Message operation successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during message operation:', error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = {
    sendMessage
};
