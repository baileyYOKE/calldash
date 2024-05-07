// EnterResultComponent.js
import React, { useState } from 'react';

function EnterResultComponent({ setPhase, setCallResult, callToPhoneNumber, justCallPhoneNumber }) {
    const [result, setResult] = useState('');

    const handleSubmit = () => {
        if (result) {
            setCallResult(result); // Store the call result
            fetch('/call/result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    callToPhoneNumber,
                    callResult: result
                })
            })
            .then(response => response.json()) // Always parse JSON for consistency
            .then(data => {
                console.log('Success:', data); // Log the success message to the console instead
                setPhase('messageSuggest'); // Move to the next phase without an alert
            })
            .catch(error => {
                console.error('Failed to send call result:', error);
                alert('Failed to send call result. Please try again.');
            });
        } else {
            alert("Please select a call result before submitting.");
        }
    };

    return (
        <div>
            <h2>Call Outcome</h2>
            {justCallPhoneNumber && <p>Call from this number: {justCallPhoneNumber}</p>}
            <select value={result} onChange={(e) => setResult(e.target.value)}>
                <option value="">Select Outcome</option>
                <option value="answered">Answered</option>
                <option value="notAnswered">Not Answered</option>
                <option value="horribly">Horribly</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default EnterResultComponent;
