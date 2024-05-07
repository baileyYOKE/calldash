// PostCallComponent.js
import React from 'react';

function PostCallComponent({ setPhase }) {
    return (
        <div>
            <h2>Summary</h2>
            <p>Good job on completing the call!</p>
            <button onClick={() => setPhase('preCall')}>Start Another Call</button>
        </div>
    );
}

export default PostCallComponent;
