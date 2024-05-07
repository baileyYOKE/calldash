// mixpanelService.js
const Mixpanel = require('mixpanel');
require('dotenv').config();

const mixpanel = Mixpanel.init(process.env.MIXPANEL_PROJECT_TOKEN_PROD, {
    debug: true
});

const trackCall = (callToPhoneNumber, callUser, callTime, callLeadType) => {
    if (!callToPhoneNumber) {
        console.error("Invalid phone number, cannot track call.");
        return;
    }

    console.log("Sending to Mixpanel - Track Call:", { callToPhoneNumber, callUser, callTime, callLeadType });
    mixpanel.people.set(callToPhoneNumber, {
        "Call Time": new Date(callTime),  // Use the custom property name
        $last_call_initiator: callUser,
        $call_type: callLeadType,
    }, function (err, res) {
        if (err) {
            console.error("Mixpanel trackCall error:", err);
        } else {
            console.log("Mixpanel trackCall response:", res);
        }
    });
};


const updateCallResult = (callToPhoneNumber, callResult) => {
    console.log("Sending to Mixpanel - Update Call Result:", { callToPhoneNumber, callResult });
    mixpanel.people.set(callToPhoneNumber, {
        $last_call_result: callResult,
        $updated: new Date()
    }, function (err, res) {
        console.log("Mixpanel Update Call Result Response:", { err, res });
    });
};

module.exports = {
    trackCall,
    updateCallResult
};
