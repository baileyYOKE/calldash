const axios = require('axios');
require('dotenv').config();

const justCallAPIKey = process.env.JUSTCALL_API_KEY;
const justCallAPISecret = process.env.JUSTCALL_API_SECRET;

const initiateCall = async (fromNumber, toNumber) => {
    const url = 'https://api.justcall.io/v1/calls/makecall';  // Correct endpoint
    try {
        const response = await axios.post(url, {
            from: fromNumber,
            to: toNumber
        }, {
            auth: {
                username: justCallAPIKey,
                password: justCallAPISecret
            }
        });
        console.log('Call initiated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error initiating call:', error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = {
    initiateCall
};
