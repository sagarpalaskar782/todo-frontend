import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../utils/endpoint-path";

export const LogIn = () => {
    const [deactivate, setDeactivate] = useState(false)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate()

    const validateForm = () => {
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
        return isValid;
    };

    const handleLogIn = async (e) => {
        e.preventDefault();
        console.log(`${process.env.REACT_APP_BACKEND_ENDPOINT}${path.LOGIN}`)
        setDeactivate(true)

        if (!validateForm()) {
            setDeactivate(false)
            return;
        }
        const userLogIn = {
            username: username,
            password: password
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}${path.LOGIN}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userLogIn)
            });

            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/home");
            } else if (response.status === 401) {
                alert("Invalid username or password.");
            } else if (response.status === 404) {
                alert("User not found.");
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
        }

    }

    return (
        <div className="card FormContainer" >
            <h2>Log In</h2>
            <form onSubmit={handleLogIn}>

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" />
                    {usernameError && <small className="text-danger mt-1">{usernameError}</small>}
                </div>


                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                    {passwordError && <small className="text-danger mt-1">{passwordError}</small>}
                </div>

                <button type="submit" className="btn btn-primary" disabled={deactivate} style={{ margin: "2% 0%" }}>Log In</button>

            </form>

            <Link to="/signUp">Sign Up</Link>
        </div>
    );
}