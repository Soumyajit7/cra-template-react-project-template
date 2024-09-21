import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../resources/firebase-config";
import "../styles/loginpage.css";
import { Link } from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonState, setButtonState] = useState(false);


  // method for login 
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setButtonState(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // console.log("User logged in:", userCredential.user);
        setButtonState(false);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMsg("The email address is not valid.");
            break;
          case "auth/user-disabled":
            setErrorMsg("This user account has been disabled.");
            break;
          case "auth/user-not-found":
            setErrorMsg("No user found with this email.");
            break;
          case "auth/wrong-password":
            setErrorMsg("Incorrect password. Please try again.");
            break;
          case "auth/too-many-requests":
            setErrorMsg(
              "Access to this account has been temporarily disabled due to too many login attempts. Please try again later."
            );
            break;
          case "auth/invalid-credential":
            setErrorMsg("The provided credential is invalid. Please try again.");
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
        <h2>Login</h2>
        <form className="login_form" onSubmit={handleLoginSubmit}>
          <input
            placeholder="Email Id"
            className="input_box"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrorMsg("") }}
          />
          <input
            placeholder="Password"
            className="input_box"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrorMsg("") }}
          />
          <span className="error_msg">{errorMsg}</span>
          <button type="submit" className="button" disabled={buttonState}>Login</button>
          <div style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
          }}>
            <Link to="/register">Register New Account</Link>
            <Link to="/forgot">Forgot Username / Password ?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
