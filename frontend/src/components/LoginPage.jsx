import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import '../Styles/LoginPage.css';
import axios from 'axios';

function LoginPage({setUser}) {

    const [userForm, setUserForm] = useState({
        email: "",
        username: "",
        password: "",
        confirmpassword: "",
    });

    const inputsHandler = (e) => {
        setUserForm((prevNext) => ({
            ...prevNext,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios
            .get(`http://localhost:5000/users/validate/${userForm.email}`)
            .then(res => {
                // console.log(res.data.available)
                // *if no account email (unique) matched
                if(res.data.available) {
                    const input = document.getElementById('email');
                    input.setCustomValidity('That email does not match with any account.');
                    return;
                }
                // console.log("res.data.data.email: " + res.data.data.email);
                // console.log("userForm.email: " + userForm.email);
                // console.log("res.data.data.username: " + res.data.data.username);
                // console.log("userForm.username: " + userForm.username);
                // console.log("res.data.data.password: " + res.data.data.password);
                // console.log("userForm.password: " + userForm.password);
                // console.log("res.data.data.confirmpassword: " + res.data.data.confirmpassword);
                // console.log("userForm.confirmpassword: " + userForm.confirmpassword);
                if(res.data.data.username != userForm.username /* ||
                    res.data.data.password != userForm.password ||
                    res.data.data.confirmpassword != userForm.confirmpassword */) {
                    // const input = document.getElementById('email');
                    // input.setCustomValidity('One or more inputs do not match.');
                    const input = document.getElementById('username');
                    input.setCustomValidity('Username does not match.');
                    // *returns a value to the function
                    // *and doesn't continue the function
                    return;
                }
                if(userForm.password == userForm.confirmpassword) {
                    axios
                        .post("http://localhost:5000/users/login", userForm)
                        .then((res) => {
                            // *.json({}) = res.data
                            // *then to access .json({data: result,}) = res.data.data 
                            // *setUser logs into an account
                            console.log(res.data.data);
                            setUser(res.data.data);
                            const user_account = JSON.stringify(res.data);
                            window.localStorage.setItem("user_account", user_account);
                            // --- A major problem is that the user's use state 
                            // --- is losing the account data whenever the page 
                            // --- reloads. I [Daniel] tried fixing the problem w/
                            // --- localStorage, but it's not working out very well. 
                            // localStorage.setItem("_user", res.data.data);
                            // console.log("_user 1:" + localStorage.getItem("_user"));
                            setUserForm({
                                email: "",
                                username: "",
                                password: "",
                                confirmpassword: "",
                            });
                            
                        });
                } else {
                    const input = document.getElementById('confirmpassword');
                    input.setCustomValidity('Password Must be Matching.');
                }
            });
    };

    useEffect(() => {}, []);

    return (
        // *method="post" is unnecessary b/c of e.preventDefault()
        <form onSubmit={onSubmit} className="form-body">
            <p className="form-title">Login Form</p>
            <div className="login-signup-main">
                <div className="login-signup-body">
                    <button id="login" className="login-signup-inner">
                        <Link className="no-decor login-signup-inner-color" to={"/login"}>Log-in</Link>
                    </button>
                    <button id="signup" className="login-signup-outer">
                        <Link className="no-decor login-signup-outer-color" to={"/signup"}>Sign-up</Link>
                    </button>
                </div>
                {/* <div className="form-animation-block" /> */}
            </div>
            <input type="email" placeholder="Email Address" id="email" name="email" className="form-box" value={userForm.email} onChange={inputsHandler} required></input>
            <input type="text" placeholder="Username" id="username" name="username" className="form-box" value={userForm.username} onChange={inputsHandler} required></input>
            <input type="password" placeholder="Password" id="password" name="password" className="form-box" value={userForm.password} onChange={inputsHandler} required></input>  
            <input type="password" placeholder="Confirm Password" id="confirmpassword" name="confirmpassword" className="form-box" value={userForm.confirmpassword} onChange={inputsHandler} required></input>        
            <div className="form-forgot-password-main">
                <a href="#" className="form-forgot-password">
                    <p>Forgot Password?</p>
                </a>
            </div>
            <button type="submit" className="form-login-button">
                <p>Login</p>     
            </button>
        </form>
    )
}

export default LoginPage;