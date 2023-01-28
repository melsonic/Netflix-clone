import React, { useRef } from "react"
import { auth } from "../firebase";
import './SignUpscreen.css'

function SignInScreen() {


	const register = (e) => {
		e.preventDefault();

		auth.createUserWithEmailAndPassword(
			emailRef.current.value,
			passwordRef.current.value
		).then((user) => {
			console.log(user)
		}).catch(err => {
			alert(err.message)
		});
	}

	const signIn = (e) => {
		e.preventDefault();

		auth.signInWithEmailAndPassword(
			emailRef.current.value,
			passwordRef.current.value
		).then(user => {
			console.log(user);
		}).catch(err => alert(err.message))
	}

	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	return (
		<div className="signUpScreen">
			<form>
				<h1>Sign In</h1>
				<input ref={emailRef} placeholder="Email" type="email" />
				<input ref={passwordRef} placeholder="password" type="password" />
				<button onClick={signIn} type="submit">Sign In</button>
				<h4>
					<span className="signUpScreen__gray">
						New to Netflix?
					</span>
					<span className="signUpScreen__link" onClick={register}>
						Sign Up now.
					</span>
				</h4>
			</form>
		</div>
	)
}

export default SignInScreen;
