import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LoginContext} from "../contexts/LoginContext";
import ShootingStars from "./ShootingStars";
const Login = () =>{
    const navigate = useNavigate();
    const { setLoggedIn } = useContext(LoginContext);
    
    const [signUpActive, setSignUpActive] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmPassword, setUserConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    
    const registerUser = (event) => {
        event.preventDefault()
        
        const registerUserModel = {
            "Username":userName,
            "Password":userPassword,
            "PasswordConfirmation": userConfirmPassword,
            "EmailAddress":userEmail
        
        }
        
        fetch("/api/user/registration", {
            method: "POST",
            body: JSON.stringify(registerUserModel),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if(res.ok){
                    setErrorMessage(null);
                    navigate("/");
                }else{
                    res.json().then((data) => {
                        let messages = data.message.split("//")
                        setErrorMessage(messages);
                    })
                }
            })
    }
    
    const loginUser = (e) => {
        e.preventDefault();
        
        const loginModel = {
            "Username": userName,
            "Password": userPassword
        }
        
        fetch("/api/user/login", {
            method: "post",
            body: JSON.stringify(loginModel),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if(res.ok){
                    setErrorMessage(null);
                    navigate("/")
                } else {
                    res.json().then((data) => {
                        let messages = data.message.split("//")
                        setErrorMessage(messages);
                    })
                }
            })
            
            
    }
    
    return <>
        {errorMessage === null ? <></> : errorMessage.map(message => <div>{message}</div>)}
        <div className={signUpActive ? "container right-panel-active" : "container"} id="container">
            <div className="form-container sign-up-container">
                <form className="login-form" action="#">
                    <h1 className={"login-h1"}>Create Account</h1>
                    <br></br>
                    <input className="login-input" type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
                    <input className="login-input" type="email" placeholder="Email" onChange={(e) => setUserEmail(e.target.value)}/>
                    <input className="login-input" type="password" placeholder="Password" onChange={(e) => setUserPassword(e.target.value)}/>
                    <input className="login-input" type="password" placeholder="Confirm Password" onChange={(e) => setUserConfirmPassword(e.target.value)}/>
                    <br></br>
                    <button className={"login-button"} onClick={(e) => registerUser(e)}>Register</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form className="login-form" action="#">
                    <h1 className={"login-h1"}>Sign in</h1>
                    <br></br>
                    <div>{errorMessage}</div>
                    <br/>
                    <input className="login-input" type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
                    <input className="login-input" type="password" placeholder="Password" onChange={(e) => setUserPassword(e.target.value)}/>
                    <a href="#">Forgot your password?</a>
                    <button className={"login-button"} onClick={(e) => loginUser(e)}>Login</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1 className="login-text">Welcome Back!</h1>
                        <p className="login-text">To keep connected with us please login with your personal info</p>
                        <button className="ghost login-button" id="signIn" onClick={() => {setSignUpActive(false); setErrorMessage(null)}}>Login</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1 className="login-text">Hello, Friend!</h1>
                        <p className="login-text">Enter your personal details and start journey with us</p>
                        <button className="ghost login-button" id="signUp" onClick={() => {setSignUpActive(true); setErrorMessage(null)}}>Register</button>
                    </div>
                </div>
            </div>

            <ShootingStars/>
        </div>
    </>
}

export default Login;