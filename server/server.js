// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const admin = require('./firebaseAdmin');
const mixpanelService = require('./mixpanelService');
const { sendMessage } = require('./sendblueService');

const db = admin.database();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Route to get the SendBlue and JustCall phone numbers from the database
app.get('/api/get-phone-number', async (req, res) => {
  try {
      const phoneNumbersRef = db.ref('phoneNumbers');
      const snapshot = await phoneNumbersRef.orderByChild('usageCount').limitToFirst(1).once('value');
      if (!snapshot.exists()) {
          throw new Error('No phone numbers available.');
      }

      const phoneNumbers = snapshot.val();
      let selectedNumber = null;

      for (let key in phoneNumbers) {
          const phoneNumber = phoneNumbers[key];
          console.log(`Checking phone number ${key} with usageCount ${phoneNumber.usageCount}`);

          if (phoneNumber.usageCount < 50) {
              const lastReset = new Date(phoneNumber.lastReset);
              const now = new Date();
              const hoursPassed = Math.abs(now - lastReset) / 36e5;
              console.log(`Hours passed for ${key}: ${hoursPassed}`);

              if (hoursPassed >= 12) {
                  console.log(`Resetting usage count for ${key}`);
                  await phoneNumbersRef.child(key).update({ usageCount: 0, lastReset: now.toISOString() });
                  phoneNumber.usageCount = 0;
              }

              await phoneNumbersRef.child(key).child('usageCount').set(phoneNumber.usageCount + 1);
              selectedNumber = { phoneNumber: key, justCallEquivalent: phoneNumber.justCallEquivalent };
              console.log(`Selected phone number ${key} for use.`);
              break;
          }
      }

      if (selectedNumber) {
          res.json(selectedNumber);
      } else {
          console.log('No available numbers after checking all.');
          res.status(429).send('No available numbers. Please try again later.');
      }
  } catch (error) {
      console.error('Failed to retrieve phone number:', error);
      res.status(500).send('Error retrieving phone number: ' + error.message);
  }
});

// SendBlue Message API
app.post('/api/send-message', async (req, res) => {
  const { phoneNumber, message, fromNumber } = req.body;
  try {
      const response = await sendMessage(phoneNumber, message, fromNumber);
      console.log("Message sent successfully", response);
      res.status(200).json(response);
  } catch (error) {
      console.error("Failed to send message:", error);
      res.status(500).json({ message: "Failed to send message", error });
  }
});

// Mixpanel - Track call initiation
app.post('/call/initiate', (req, res) => {
  const { callToPhoneNumber, callUser, callTime, callLeadType } = req.body;

  try {
      mixpanelService.trackCall(callToPhoneNumber, callUser, callTime, callLeadType);
      res.status(200).json({ message: "Call initiated successfully" });
  } catch (error) {
      console.error("Error initiating call:", error);
      res.status(500).json({ message: "Failed to initiate call", error });
  }
});

// server.js
// server.js
// server.js
// server.js
// server.js endpoint for /call/result
app.post('/call/result', (req, res) => {
  const { callToPhoneNumber, callResult } = req.body;

  try {
      mixpanelService.updateCallResult(callToPhoneNumber, callResult);
      res.status(200).json({ message: 'Call result updated successfully.' });
  } catch (error) {
      console.error("Failed to update call result:", error);
      res.status(500).json({ message: "Error updating call result.", error: error.toString() });
  }
});





if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
