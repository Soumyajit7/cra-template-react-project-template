import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../resources/firebase-config";
import "../styles/loginpage.css";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [buttonState, setButtonState] = useState(false);

    // Method for sending password reset email
    const handlePasswordResetSubmit = (event) => {
        event.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setButtonState(true);

        if (!email) {
            setErrorMsg("Please enter your email address.");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccessMsg("A password reset email has been sent to your email address.");
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/invalid-email":
                        setErrorMsg("The email address is not valid.");
                        break;
                    case "auth/user-not-found":
                        setErrorMsg("No user found with this email.");
                        break;
                    case "auth/too-many-requests":
                        setErrorMsg(
                            "Too many requests. Access to this account has been temporarily disabled. Please try again later."
                        );
                        break;
                    default:
                        setErrorMsg("An unknown error occurred. Please try again.");
                }
                // console.log("Error:", error.code, error.message);
            });
        setButtonState(false);
    };

    return (
        <div className="login_container">
            <div className="">
                <h2>Forgot Password</h2>
                <form className="login_form" onSubmit={handlePasswordResetSubmit}>
                    <input
                        placeholder="Email Id"
                        className="input_box"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErrorMsg(""); setSuccessMsg(""); }}
                    />
                    {errorMsg && <span className="error_msg">{errorMsg}</span>}
                    {successMsg && <span className="success_msg">{successMsg}</span>}
                    <button type="submit" className="button" disabled={buttonState}>Send Reset Link</button>
                    <div style={{
                        marginTop: "1rem",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <Link to="/register">Register New Account</Link>
                        <Link to="/login">Already Have Account? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
