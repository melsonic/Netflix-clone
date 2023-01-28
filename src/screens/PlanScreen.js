import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import db from '../firebase';
import './PlanScreen.css';
import { loadStripe } from "@stripe/stripe-js"

export default function PlanScreen() {

	const [products, setProducts] = useState([]);
	const [subs, setSubs] = useState([null]);
	const user = useSelector(selectUser);


	useEffect(() => {
		db.collection('customer').doc(user.uid).collection('subscriptions').get().then(querySnapshot => {
			querySnapshot.forEach(async subscription => {
				setSubs({
					role: subscription.data,
					current_period_end: subscription.data().current_period_end.seconds,
					current_period_start: subscription.data().current_period_start.seconds,
				})
			})
		})
	}, [user.id])


	useEffect(() => {
		db.collection('products')
			.where('active', '==', true)
			.get().then(querySnapshot => {
				const products = {};
				querySnapshot.forEach(async productDoc => {
					products[productDoc.id] = productDoc.data();
					const priceSnap = await productDoc.ref.collection('prices').get();
					priceSnap.docs.forEach(price => {
						products[productDoc.id].prices = {
							priceId: price.id,
							priceData: price.data()
						}
					})
				})
				setProducts(products);
			})
	}, []);

	// console.log(products);

	const loadCheckOut = async (priceId) => {
		console.log("loadCheckout");
		const docRef = await db.collection('customers').doc(user.uid).collection("checkout_sessions").add({
			price: priceId,
			success_url: window.location.origin,
			cancel_url: window.location.origin
		});
		docRef.onSnapshot(async (snap) => {
			const { error, sessionId } = snap.data();
			if (error) {
				alert('An error occured: ' + error.message);
			}
			if (sessionId) {
				console.log("sessionId : " + sessionId);
				const stripe = await loadStripe(process.env.stripeKey);
				stripe.redirectToCheckout({ sessionId });
			}
		});
	};

	return (
		<div className="planScreen">
			{Object.entries(products).map(([productId, productData]) => {
				const isCurrentpackage = productData.metadata.role?.toLowerCase().includes(subs?.name);

				console.log(subs);

				return (
					<div className="planScreen__plan">
						<div className="planScreen__info">
							<h5>{productData.name}</h5>
							<h6>{productData.description}</h6>
						</div>

						<button onClick={() => !isCurrentpackage && loadCheckOut(productData.prices.priceId)}>
							{isCurrentpackage ? 'Current Package' : 'Subscribe'}
						</button>
					</div>
				);
			})}
			{/* {console.log(Object.entries(products))} */}
		</div>
	)
}
