// PreCallComponent.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function PreCallComponent({ setPhase, setCallToPhoneNumber, setLeadType, setSendbluePhoneNumber, setJustCallPhoneNumber }) {
    const [inputNumber, setInputNumber] = useState('');
    const [leadType, setLeadTypeState] = useState('');
    const [error, setError] = useState('');
    const { currentUser } = useAuth();

    const handleSubmit = async () => {
        if (!/^\+1\d{10}$/.test(inputNumber)) {
            setError("Input the phone number in E.164 format (+1XXXXXXXXXX)");
            return;
        }
        if (!leadType) {
            setError("Select a Lead Type from the dropdown.");
            return;
        }
        if (!currentUser || !currentUser.email) {
            setError("No user logged in or email not available.");
            return;
        }

        setError('');
        setCallToPhoneNumber(inputNumber);
        setLeadType(leadType);

        try {
            const response = await fetch('/api/get-phone-number');
            const data = await response.json();
            if (response.ok) {
                setSendbluePhoneNumber(data.phoneNumber); // Set the actual SendBlue number
                setJustCallPhoneNumber(data.justCallEquivalent); // Set the JustCall equivalent
                setPhase('enterResult');

                const trackResponse = await fetch('/call/initiate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        callToPhoneNumber: inputNumber,
                        callUser: currentUser.email,
                        callTime: new Date().toISOString(),
                        callLeadType: leadType
                    })
                });
                const trackData = await trackResponse.json();
                console.log('Response from /call/initiate:', trackData);
            } else {
                throw new Error(data.message || 'Failed to get phone number');
            }
        } catch (error) {
            console.error('Error fetching phone number or initiating call:', error);
            setError(error.message || 'Failed to initiate call. Please try again.');
        }
    };

    return (
        <div>
            <h2>Start Your Call</h2>
            <input
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                placeholder="Enter phone number in +1XXXXXXXXXX format"
            />
            <select value={leadType} onChange={(e) => setLeadTypeState(e.target.value)}>
                <option value="">Select Lead Type</option>
                <option value="neverOpened">Never Opened</option>
                <option value="neverTeammates">Never Teammates</option>
                <option value="neverSupporters">Never Supporters</option>
                <option value="superAthlete">Super Athlete</option>
                <option value="teammates">Teammates</option>
            </select>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleSubmit}>Call</button>
        </div>
    );
}

export default PreCallComponent;
