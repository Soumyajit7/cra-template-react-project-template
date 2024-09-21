import React, { useState } from 'react';
import { auth } from '../resources/firebase-config';
import { sendEmailVerification } from 'firebase/auth';

const VerifyEmailPage = () => {
    const [statusMsg, setStatusMsg] = useState("A verification email has been sent. Please check your inbox, verify your email, and refresh this page to access your dashboard.");
    const [buttonState, setButtonState] = useState(false);


    // Function to resend verification email
    const handleResendVerification = () => {
        setButtonState(true);
        if (auth.currentUser) {
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    setStatusMsg("Verification email sent again. Please check your inbox.");
                })
                .catch((error) => {
                    setStatusMsg(`Error: ${error.message}`);
                });
        } else {
            setStatusMsg("No user is logged in.");
        }
        setButtonState(true);
    };

    return (
        <div
            style={{
                height: "90vh",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <p>{statusMsg}</p>
            <button className="button" onClick={handleResendVerification} disabled={buttonState}>
                Send Verification Email Again
            </button>
        </div>
    );
};

export default VerifyEmailPage;
