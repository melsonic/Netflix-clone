import React from 'react'
import './HomeScreen.css'
import Nav from '../Nav'
import Banner from "../Banner"
import requests from '../Requests'
import Row from '../Row'

export default function HomeScreen() {
	return (
		<div className="homeScreen">
			{/* Nav */}
			<Nav />

			{/* Banner */}
			<Banner />

			{/* Row */}
			<Row
				title="Netflix Originals"
				fetchUrl={requests.fetchNetflixOriginals}
				isLargeRow={true}
				key="1"
			/>

			<Row
				title="Trending Now"
				fetchUrl={requests.fetchTrending}
				key="2"
			/>

			<Row
				title="Top Rated"
				fetchUrl={requests.fetchTopRated}
				key="3"
			/>

			<Row
				title="Action Movies"
				fetchUrl={requests.fetchActionMovies}
				key="4"
			/>

			<Row
				title="Comedy Movies"
				fetchUrl={requests.fetchComedyMovies}
				key="5"
			/>

			<Row
				title="Horror Movies"
				fetchUrl={requests.fetchHorrorMovies}
				key="6"
			/>

			<Row
				title="Romance Movies"
				fetchUrl={requests.fetchRomanceMovies}
				key="7"
			/>

			<Row
				title="Documentaries"
				fetchUrl={requests.fetchDocumentaries}
				key="8"
			/>

		</div>
	)
}
