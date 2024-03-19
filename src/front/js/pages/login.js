import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const token = sessionStorage.getItem("token");
	console.log("This your token", store.token)
	const handleClick = () => {
		actions.login(email,password);
	};
	if(store.token && store.token != "" && store.token != undefined) navigate("/");

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			{(store.token && store.token!="" && store.token!=undefined) ? "You are logged in with this token "+ store.token : 


				<div>
					<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
					<input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					<button onClick={handleClick}>Login</button>
				</div>

				}
		</div>
	);
};
