import React from "react";
import Header from "../Header/Header";
import "./Home.css";
import MovieList from "../MoviesList/MovieList";
import Footer from "../Footer/Footer";

const Home = () => {
	const [pageNo, setPageNo] = React.useState(1);
	function increaseCount() {
		setPageNo(function (prevState) {
			return prevState + 1;
		});
	}
	function decreaseCount() {
		// if (pageNo === 1) {
		// 	return;
		// }
		setPageNo(function (prevState) {
			return prevState - 1;
		});
	}
	return (
		<>
			<Header />
			<Banner />
			<MovieList pageNo={pageNo} />
			<div className="pagination">
                <button onClick={decreaseCount} disabled={pageNo===1?"disabled":""}>Prev</button>
				<div className="page_No">{pageNo}</div>
				<button onClick={increaseCount}>Next</button>
            </div>
            <Footer/>
		</>
	);
};

const Banner = () => {
	let [movie, setMovie] = React.useState("");
	React.useEffect(function () {
		async function fetchData() {
			let response = await fetch(
				"https://api.themoviedb.org/3/trending/all/day?api_key=bbbb453232473dc64d9767525f766396"
			);
			let data = await response.json();
			let movies = data.results;
			console.log(movies);
			setMovie(movies[0]);
		}
		fetchData();
	}, []);

	return (
		<div className="Banner">
			<img
				className="Banner_img"
				alt="banner-img"
				src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
			/>
			{movie === "" ? (
				<h1>Movies yet to come</h1>
			) : (
				<h2>{movie.original_title}</h2>
			)}
		</div>
	);
};

export { Home, Banner };
