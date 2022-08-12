import React from "react";
import Header from "../Header/Header"
import "./Favourites.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronCircleDown,faChevronCircleUp} from "@fortawesome/free-solid-svg-icons";

const Favourites = () => {
	let [favourites, setFavourites] = React.useState([])
	let [popularity, setPopularity] = React.useState(null);
	let [rating, setRating] = React.useState(null);
	let [searchvalue, setValue] = React.useState("")
	let [noOfElement, setnoOfElement] = React.useState(5)
	let [currPage, setPageNo ] = React.useState(1)
	const [genres, setGenres] = React.useState([])
	

	 let genreids = {
			28: "Action",
			12: "Adventure",
			16: "Animation",
			35: "Comedy",
			80: "Crime",
			99: "Documentary",
			18: "Drama",
			10751: "Family",
			14: "Fantasy",
			36: "History",
			27: "Horror",
			10402: "Music",
			9648: "Mystery",
			10749: "Romance",
			878: "Sci-Fi",
			10770: "TV",
			53: "Thriller",
			10752: "War",
			37: "Western",
	};

	
    React.useEffect(() => {
			let favString = localStorage.getItem("favourites") || "[]";
			let favArr = JSON.parse(favString);
			setFavourites(favArr);
	}, []);
	

	React.useEffect(() => {
		let temp = favourites.map((movie) => genreids[movie.genre_ids[0]]);
		// console.log(temp);
		temp = new Set(temp);
		setGenres(["All Genres",...temp])
	}, [favourites])


	function setRatingHandler(order) {
		setRating(order);
		setPopularity(null);
	}

	function setPopularityHandler(order) { 
		setRating(null);
		setPopularity(order)
	}


	function changeValue(e) { 
		let val = e.target.value;
		setValue(val);
		setPageNo(1)
	
	}

	function changenoOfElement(e) { 
		let ele = e.target.value;
		setnoOfElement(ele)
	}

	function increaseCount() {
		if (noOfElement * currPage >= favourites.length) { 
			return
		}
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

	function findGenreId(movieObjArray) {
		let genrearr = Object.keys(genreids);
		for (let i = 0; i < genrearr.length; i++) {
			for (let j = 0; j < movieObjArray.length; j++) {
				if (movieObjArray[j] == genrearr[i]) {
					return genreids[genrearr[i]];
				}
			}
		}
	}


	function deleteFn(id) {
		let favoritelist = favourites.filter((ele) => {
			return ele.id !== id;
		});
		let prevStorage = localStorage.getItem("favourites") || "[]";
		let prevStorageString = JSON.parse(prevStorage);
		prevStorageString = prevStorageString.filter((movieObj) => {
			return movieObj.id != id;
		});
		prevStorageString = JSON.stringify(prevStorageString);
		localStorage.setItem("favourites", prevStorageString);
		setFavourites(favoritelist);
	}

	let searchedMovies = searchvalue == "" ? favourites : filterLogic(searchvalue, favourites)
	let ratedMovies = rating == null ? searchedMovies : sortFavourites(rating, searchedMovies)
	let sortedByPop = popularity == null ? ratedMovies : sortByPopularity(popularity, ratedMovies)
	
	let sidx = Number((currPage - 1) * noOfElement);
	let eidx = Number(sidx) + Number(noOfElement);
	console.log(sidx, " ", eidx)
	let paginatedResult = sortedByPop.slice(sidx, eidx);

	
	return (
		<div>
			<Header />
			{console.log(favourites)}
			<GenreBox genres={genres} />
			<div className="paginationBox">
				<input
					type="text"
					placeholder="Search"
					onChange={changeValue}
					value={searchvalue}
				/>
				<input
					type="number"
					min="1"
					onChange={changenoOfElement}
					value={noOfElement}
				/>
			</div>
			<table className="favouriteTable">
				<thead>
					<tr>
						<th style={{textAlign:"left"}}>Name</th>
						<th>
							<FontAwesomeIcon
								className="fav-icon"
								icon={faChevronCircleUp}
								onClick={() => {
									setRatingHandler(true);
								}}
							/>
							Rating
							<FontAwesomeIcon
								className="fav-icon"
								icon={faChevronCircleDown}
								onClick={() => {
									setRatingHandler(false);
								}}
							/>
						</th>
						<th>
							<FontAwesomeIcon
								className="fav-icon"
								icon={faChevronCircleUp}
								onClick={() => {
									setPopularityHandler(true);
								}}
							/>
							Popularity
							<FontAwesomeIcon
								className="fav-icon"
								icon={faChevronCircleDown}
								onClick={() => {
									setPopularityHandler(false);
								}}
							/>
						</th>
						<th>Genre</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{paginatedResult.map((movieObj, id) => {
						return (
							<tr key={id}>
								<td className="favImgtitle">
									<div className="fav-items">
										<div>
											<img
												className="poster_img"
												src={`https://image.tmdb.org/t/p/w500/${movieObj.poster_path}`}
											/>
										</div>
										<div>
											<h4>{movieObj.original_title}</h4>
										</div>
									</div>
								</td>
								<td>{movieObj.vote_average}</td>
								<td>{movieObj.popularity}</td>
								<td className="favGenre">
									<span>{findGenreId(movieObj.genre_ids)}</span>
								</td>
								<td style={{ color: "red", fontWeight: "600",cursor:"pointer" }}><span onClick={()=>{deleteFn(movieObj.id)}}>Delete</span></td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="pagination">
				<button
					onClick={decreaseCount}
					disabled={currPage === 1 ? "disabled" : ""}
				>
					Prev
				</button>
				<div className="page_No">{currPage}</div>
				<button onClick={increaseCount}>Next</button>
			</div>
		</div>
	);
};


const GenreBox = (props) => {
	return (
		<div className="genreList">
			{props.genres.map((genrekey, idx) => {
				if (genrekey != null) { 
						return <h4 key={idx}>{genrekey}</h4>;
				}
			})}
		</div>
	);
}




function sortFavourites(ratingOrder, favouritemovie) { 
	if (ratingOrder == null) {
		return favouritemovie;
	}
	function helper(a, b) {
		if (ratingOrder) {
			if (a.vote_average > b.vote_average) {
				return 1;
			}
			else if (a.vote_average < b.vote_average) {
				return -1;
			}
			else {
				return 0;
			}
		}
		else { 
			if (a.vote_average > b.vote_average) { 
				return -1;
			}
			else if (a.vote_average < b.vote_average) {
				return 1;
			}
			else {
				return 0;
			}
		}
	}

	let ratedFavourites = favouritemovie.sort(helper);
	return ratedFavourites

}

function sortByPopularity(popularityOrder, movies) { 
	if (popularityOrder == null) { 
		return movies;
	}
	function helper(a, b) {
		if (popularityOrder) {
			if (a.popularity > b.popularity) {
				return 1;
			} else if (a.popularity < b.popularity) {
				return -1;
			} else {
				return 0;
			}
		} else {
			if (a.popularity > b.popularity) {
				return -1;
			} else if (a.popularity < b.popularity) {
				return 1;
			} else {
				return 0;
			}
		}
	}
    
	let popularitySortedMovies = movies.sort(helper);
	return popularitySortedMovies
}

function filterLogic(value, moviearray) { 
	let newArray = []
	for (let i = 0; i < moviearray.length; i++) { 
		let valUpper = "" + value.toUpperCase();
		let getitle = "" + moviearray[i].original_title
		let title=getitle.toUpperCase();
		if (title.includes(valUpper)) { 
			newArray.push(moviearray[i])
		}
	}
	return newArray;
}


export default Favourites;
