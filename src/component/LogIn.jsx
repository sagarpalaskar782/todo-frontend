import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export const LogIn = () => {
    const [deactivate, setDeactivate] = useState(false)

    const username = useRef();
    const password = useRef();

    const handleLogIn = (e) => {
        setDeactivate(true)
        e.preventDefault();
        const userLogIn = {
            email: username.current.value,
            password: password.current.value
        }
        fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userLogIn)
        }).then(res => res.json())
            .then(data => {
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    window.location.href = "/home";
                } else {
                    alert(`${data.message}`);
                }
            })
            .catch(err => {
                alert(`${err.message}`);

            });

        // username.current.value = "";
        // password.current.value = "";
        setDeactivate(false)
    }

    return (
        <div className="card FormContainer" >
            <h2>Log In</h2>
            <form onSubmit={handleLogIn}>

                <div className="mb-3">
                    <label class="form-label">Username</label>
                    <input ref={username} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>


                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input ref={password} type="password" className="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary" disabled={deactivate} style={{ margin: "2% 0%" }}>Log In</button>

            </form>

            <Link to="/signUp">Sign Up</Link>
        </div>
    );
}