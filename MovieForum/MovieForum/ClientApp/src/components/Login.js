import {useState} from "react";

const Login = () =>{
    const [signUpActive, setSignUpActive] = useState(false);
    
    return <>
        <div className={signUpActive ? "container right-panel-active" : "container"} id="container">
            <div className="form-container sign-up-container">
                <form className="login-form" action="#">
                    <h1>Create Account</h1>
                    <input className="login-input" type="text" placeholder="Name"/>
                    <input className="login-input" type="email" placeholder="Email"/>
                    <input className="login-input" type="password" placeholder="Password"/>
                    <input className="login-input" type="password" placeholder="Confirme Password"/>
                    <button className={"login-button"}>Register</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form className="login-form" action="#">
                    <h1>Sign in</h1>
                    <input className="login-input" type="email" placeholder="Email"/>
                    <input className="login-input" type="password" placeholder="Password"/>
                    <a href="#">Forgot your password?</a>
                    <button className={"login-button"}>Login</button>
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