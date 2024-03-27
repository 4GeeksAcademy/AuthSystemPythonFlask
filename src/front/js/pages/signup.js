import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        // Call the signup action passing email and password
        actions.signup(email, password);

        // After successful signup, you may want to redirect the user to another page
        navigate("/"); // Redirect to home page, adjust this as per your application flow
    };

    return (
        <div className="text-center mt-5">
            <h1>Sign Up</h1>
            <div>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleClick}>Sign Up</button>
            </div>
        </div>
    );
};
