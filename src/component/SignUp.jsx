import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
    const [deactivate, setDeactivate] = useState(false)

    const username = useRef();
    const email = useRef();
    const password = useRef();

    const handleSubmit = (e) => {
        setDeactivate(true)
        e.preventDefault();
        const userSignUp = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value
        }
        fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userSignUp)
        }).then(res => res.json())
            .then(data => {
                if (data.user) {
                    window.location.href = "/";
                } else {
                    alert(`${data.message}`);
                }
            })
            .catch(err => {
                alert(`${err.message}`);
                console.log(err)
            });
        console.log('clicked on sign up', userSignUp);
        username.current.value = "";
        email.current.value = "";
        password.current.value = "";
        setDeactivate(false)

    }

    return (
        <div className="card FormContainer" >
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input ref={username} type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input ref={email} type="email" className="form-control" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input ref={password} type="password" className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary Button" disabled={deactivate}>Submit</button>
            </form>
            <Link to="/login">Log In </Link>

        </div>
    );
}
