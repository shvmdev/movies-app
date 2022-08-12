import React from 'react'
import "./MovieList.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';


const MovieList = (props) => {
	let [movieList, setMovieList] = React.useState("");
	let [value, setValue] = React.useState("");
	let [favourites, setFavorites] = React.useState([]);
	function changeValue(e) {
		setValue(e.target.value);
	}

	function checkFavourite(id) { 
		let prevStorage = localStorage.getItem("favourites") || "[]";
		let favouritesArray = JSON.parse(prevStorage);
		for (let i = 0; i < favouritesArray.length; i++) { 
			if (favouritesArray[i].id === id) { 
				return true;
			}
		}
		return false;
	}


	function addFavorite(id) { 
		for (let i = 0; i < movieList.length; i++) { 
			if (movieList[i].id === id) { 
				let newarr = [...favourites];
				newarr.push(movieList[i]);
				let prevStorage = localStorage.getItem("favourites") || "[]"
				let prevStorageString = JSON.parse(prevStorage)
				prevStorageString.push(movieList[i]);
				prevStorageString = JSON.stringify(prevStorageString)
				localStorage.setItem("favourites", prevStorageString)
				setFavorites(newarr);
				break;
			}
		}
	}

	function removeFavorite(id) { 
		let favoritelist = favourites.filter((ele) => {
		  return ele.id!==id
		})
		let prevStorage = localStorage.getItem("favourites") || "[]";
		let prevStorageString = JSON.parse(prevStorage);
		prevStorageString = prevStorageString.filter((movieObj) => {
			return movieObj.id != id;
		})
		prevStorageString = JSON.stringify(prevStorageString);
		localStorage.setItem("favourites", prevStorageString);
		setFavorites(favoritelist);
	}


	React.useEffect(
		function () {
			async function fetchData() {
				let response = await fetch(
					"https://api.themoviedb.org/3/trending/all/day?api_key=bbbb453232473dc64d9767525f766396&page=" +
						props.pageNo
				);
				let data = await response.json();
				let moviesdata = data.results;
				setMovieList(moviesdata);
			}
			fetchData();
		},
		[props.pageNo]
	);

	function filterArray(searchvalue, searcharray) {
		let newArray = [];
		for (let i = 0; i < searcharray.length; i++) {
			let uppertext = "" + searchvalue.toUpperCase();
			let movieName = "" + searcharray[i].original_title;
			let title = movieName.toUpperCase();
			if (title.includes(uppertext)) {
				newArray.push(searcharray[i]);
			}
		}
		return newArray;
	}
	let filteredmovieList = filterArray(value, movieList);

	return (
		<div className="ListMovies">
			<h2>Trending Movies</h2>
			<div className="List-search">
				<input className="List-input" onChange={changeValue} value={value} />
				<button type="button" className="List-button">
					Search
				</button>
			</div>
			{movieList === "" ? (
				<h2>Movies</h2>
			) : (
				<div className="Movies-container">
					{filteredmovieList.map((movieObj, idx) => {
						return (
							<div key={idx} className="List-imgbox">
								<img
									className="List-images"
									alt="movie-img"
									src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`}
								/>
								<h3>{movieObj.original_title}</h3>
								{checkFavourite(movieObj.id) ? (
									<span style={{padding:"0.4rem",fontSize:"1.2rem"} } onClick={()=>{removeFavorite(movieObj.id)}}>❤️</span>
								) : (
										<FontAwesomeIcon style={{ padding:"0.6rem",fontSize:"1.3rem"} } className="fa-heart" onClick={()=>{addFavorite(movieObj.id)}} icon={faHeart} />
								)}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default MovieList