// src/utils/userDetails.js

const userNamesByEmail = {
    'bailey@bailey.com': 'Bailey',
    'user2@example.com': 'Alice',
    'user3@example.com': 'Bob',
    'user4@example.com': 'Charlie',
    'user5@example.com': 'Dana'
};

export const getNameByEmail = (email) => {
    return userNamesByEmail[email] || 'Unknown User'; // Default if email not found
};
