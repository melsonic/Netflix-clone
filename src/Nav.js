import React, { useEffect, useState } from "react";
import './Nav.css';
import { useNavigate } from 'react-router-dom';

export default function Nav() {

	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	const transitionNavbar = (() => {
		console.log(window)
		if (window.scrollY > 100) {
			setShow(true)
		} else {
			setShow(false)
		}
	})

	useEffect(() => {
		window.addEventListener("scroll", transitionNavbar)
		return () => window.removeEventListener("scroll", transitionNavbar)
	}, [])

	return (
		<div className={`nav ${show && 'nav__black'}`}>
			<div className="nav__contents">
				<img
					onClick={() => navigate("/")}
					className="nav__logo"
					src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png'
					alt="netflix-logo"
				/>

				<img
					onClick={() => navigate("profile")}
					className="nav__avatar"
					src="https://cdn1.iconfinder.com/data/icons/smileys-emoticons-green-filled-with-medical-mask-i/96/SMILEY_SMILING_filled_green-512.png"
					alt="avatar"
				/>
			</div>
		</div>
	)
}
