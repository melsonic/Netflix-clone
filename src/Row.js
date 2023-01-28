import React, { useEffect, useState } from 'react'
import axios from "./axios"

import './Row.css'

function Row({ title, fetchUrl, isLargeRow = false }) {
	const [movies, setMovies] = useState([]);
	const base_url = 'https://image.tmdb.org/t/p/original/';

	useEffect(() => {
		function fetchData() {
			axios.get(fetchUrl)
				.then((response) => {
					setMovies(response.data.results);
				})
		}

		fetchData();
	}, [fetchUrl]);

	return (
		<div className="row">
			<h2>{title}</h2>

			<div className="row__posters">
				{movies?.map(movie => (
					((isLargeRow && movie.poster_path) ||
						(!isLargeRow && movie.backdrop_path)) &&
					(
						<>
							<img
								className={`row__poster ${isLargeRow && "row__posterLarge"}`}
								key={movie.id}
								src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
									}`}
								alt="damn"
							/>
						</>
					)
				))}
			</div>

		</div>
	)
}

export default Row;
