import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../utils/endpoint-path";

export const SignUp = () => {
    const [deactivate, setDeactivate] = useState(false)
    const navigate = useNavigate()

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const validateSignUpForm = () => {
        let isValid = true;
        setUsernameError('');
        setPasswordError('');

        if (username.trim() === '') {
            setUsernameError('Username is required.');
            isValid = false;
        }

        if (password.trim() === '') {
            setPasswordError('Password is required.');
            isValid = false;
        } else if (password.trim().length < 4) {
            setPasswordError('Password must be at least 4 characters.');
            isValid = false;
        }

        if (email.trim() === '') {
            setEmailError('Email is required.');
            isValid = false;
        }
        return isValid;
    };


    const handleSubmit = async (e) => {
        setDeactivate(true)
        e.preventDefault();

        if (!validateSignUpForm()) {
            setDeactivate(false)
            return;
        }
        const userSignUp = {
            username: username,
            email: email,
            password: password
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}${path.SIGNUP}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userSignUp)
            });

            const data = await response.json();

            if (response.status === 201) {
                navigate("/login");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            setDeactivate(false);
            setUsername('');
            setPassword('');
            setEmail('');
        }

    }

    return (
        <div className="card FormContainer" >
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" />
                    {usernameError && <small className="text-danger mt-1">{usernameError}</small>}

                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                    {emailError && <small className="text-danger mt-1">{passwordError}</small>}

                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                    {passwordError && <small className="text-danger mt-1">{passwordError}</small>}
                </div>

                <button type="submit" className="btn btn-primary Button" disabled={deactivate}>Submit</button>
            </form>
            <Link to="/login">Log In </Link>

        </div>
    );
}
