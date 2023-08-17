import {useState} from "react";

const Login = () =>{
    const [signUpActive, setSignUpActive] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmPassword, setUserConfirmPassword] = useState("");
    
    const registerUser = (event) => {
        event.preventDefault()
        
        const registerUserModel = {
            "Username":userName,
            "Password":userPassword,
            "PasswordConfirmation": userConfirmPassword,
            "EmailAddress":userEmail
        
        }
        
        console.log(registerUserModel)
        
        fetch("/api/user/registrationXX", {
            method: "POST",
            body: JSON.stringify(registerUserModel),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then()
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
            .then(res => console.log(res))
    }
    
    return <>
        <div className={signUpActive ? "container right-panel-active" : "container"} id="container">
            <div className="form-container sign-up-container">
                <form className="login-form" action="#">
                    <h1 className={"login-h1"}>Create Account</h1>
                    <input className="login-input" type="text" placeholder="Name" onChange={(e) => setUserName(e.target.value)}/>
                    <input className="login-input" type="email" placeholder="Email" onChange={(e) => setUserEmail(e.target.value)}/>
                    <input className="login-input" type="password" placeholder="Password" onChange={(e) => setUserPassword(e.target.value)}/>
                    <input className="login-input" type="password" placeholder="Confirm Password" onChange={(e) => setUserConfirmPassword(e.target.value)}/>
                    <button className={"login-button"} onClick={(e) => registerUser(e)}>Register</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form className="login-form" action="#">
                    <h1 className={"login-h1"}>Sign in</h1>
                    <input className="login-input" type="text" placeholder="username" onChange={(e) => setUserName(e.target.value)}/>
                    <input className="login-input" type="password" placeholder="Password" onChange={(e) => setUserPassword(e.target.value)}/>
                    <a href="#">Forgot your password?</a>
                    <button className={"login-button"} onClick={(e) => loginUser(e)}>Login</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={() => setSignUpActive(false)}>Login</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={() => setSignUpActive(true)}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Login;