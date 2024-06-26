// Dashboard.js
import React, { useState } from 'react';
import PreCallComponent from './PreCallComponent';
import EnterResultComponent from './EnterResultComponent';
import MessageSuggestComponent from './MessageSuggestComponent';
import PostCallComponent from './PostCallComponent';

function Dashboard() {
    const [phase, setPhase] = useState('preCall');
    const [callToPhoneNumber, setCallToPhoneNumber] = useState('');
    const [callResult, setCallResult] = useState('');
    const [leadType, setLeadType] = useState('');
    const [sendbluePhoneNumber, setSendbluePhoneNumber] = useState('');
    const [justCallPhoneNumber, setJustCallPhoneNumber] = useState('');

    const renderComponent = () => {
        switch (phase) {
            case 'preCall':
                return <PreCallComponent 
                           setPhase={setPhase}
                           setCallToPhoneNumber={setCallToPhoneNumber}
                           setLeadType={setLeadType}
                           setSendbluePhoneNumber={setSendbluePhoneNumber}
                           setJustCallPhoneNumber={setJustCallPhoneNumber}
                       />;
            case 'enterResult':
                return <EnterResultComponent 
                           setPhase={setPhase}
                           setCallResult={setCallResult}
                           callToPhoneNumber={callToPhoneNumber}
                           justCallPhoneNumber={justCallPhoneNumber}
                       />;
            case 'messageSuggest':
                return <MessageSuggestComponent
                           userResponse={callResult}
                           callToPhoneNumber={callToPhoneNumber}
                           sendbluePhoneNumber={sendbluePhoneNumber}
                           setPhase={setPhase}
                       />;
            case 'postCall':
                return <PostCallComponent setPhase={setPhase} />;
            default:
                return <h1>Welcome to the Dashboard</h1>;
        }
    };

    return (
        <div>
            {renderComponent()}
        </div>
    );
}

export default Dashboard;
