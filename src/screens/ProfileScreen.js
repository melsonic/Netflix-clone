import React from 'react';
import './ProfileScreen.css';
import Nav from '../Nav';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import { auth } from '../firebase';
import PlanScreen from './PlanScreen';


function ProfileScreen() {

	const user = useSelector(selectUser);

	return (
		<div class="profileScreen">
			<Nav />
			<div className="profileScreen__body">
				<h1>Edit Profile</h1>
				<div className="profileScreen__info">
					<img
						src="https://cdn1.iconfinder.com/data/icons/smileys-emoticons-green-filled-with-medical-mask-i/96/SMILEY_SMILING_filled_green-512.png"
						alt="profile emoji"
					/>
					<div className="profileScreen__details">
						<h2>{user.email}</h2>
						<div className="profileScreen__plans">
							<h3>Plans</h3>

							<PlanScreen />

							<button onClick={() => auth.signOut()} className="profileScreen__signOut" >Sign Out</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileScreen; 
