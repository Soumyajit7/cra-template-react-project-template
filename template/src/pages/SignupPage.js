import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, userRef } from "../resources/firebase-config";
import "../styles/loginpage.css";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonState, setButtonState] = useState(false);


  // method for registering a new user
  const handleRegisterAccount = async (event) => {
    event.preventDefault();
    setButtonState(true);
    if (password !== retypePassword) {
      setErrorMsg("Passwords do not match. Please try again.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // console.log("User registered:", userCredential.user);
      const userEmail = userCredential.user.email;

      // Storing user data in Firestore
      const userDocRef = doc(userRef, userEmail);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, { email: userEmail, password: password, homes: [] });
        // console.log("User created successfully in Firestore");
        // Send email verification
        await sendEmailVerification(userCredential.user);
      } else {
        // console.log("User already exists in Firestore");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMsg("This email is already in use. Please use a different email.");
          break;
        case "auth/invalid-email":
          setErrorMsg("The email address is not valid.");
          break;
        case "auth/operation-not-allowed":
          setErrorMsg("Email/password accounts are not enabled. Please contact support.");
          break;
        case "auth/weak-password":
          setErrorMsg("The password is too weak. Please enter a stronger password.");
          break;
        case "auth/too-many-requests":
          setErrorMsg("Too many requests. Please try again later.");
          break;
        default:
          setErrorMsg("An unknown error occurred. Please try again.");
      }
      // console.log("Error:", error.code, error.message);
    }
    setButtonState(false);
  };

  return (
    <div className="login_container">
      <div className="">
        <h2>Register</h2>
        <form className="login_form" onSubmit={handleRegisterAccount}>
          <input
            placeholder="Email"
            className="input_box"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMsg("");
            }}
          />
          <input
            placeholder="Password"
            className="input_box"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMsg("");
            }}
          />
          <input
            placeholder="Retype Password"
            className="input_box"
            type="password"
            value={retypePassword}
            onChange={(e) => {
              setRetypePassword(e.target.value);
              setErrorMsg("");
            }}
          />
          <span className="error_msg">{errorMsg}</span>
          <button type="submit" className="button" disabled={buttonState}>Register</button>
          <div style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
          }}>
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
