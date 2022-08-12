import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div className="Header">
			<Link to="/home">
				<img
					className="Header-img"
					src={
						"https://img.icons8.com/external-bearicons-blue-bearicons/50/000000/external-movie-call-to-action-bearicons-blue-bearicons.png"
					}
					alt="logo-img"
				/>
			</Link>
			<Link style={{ textDecoration: "none",color:'skyblue' }} to="/home">
				<h2>Movies</h2>
			</Link>
			<Link style={{ textDecoration: "none",color:'skyblue' }} to="/favourites">
				<h2>Favourites</h2>
			</Link>
		</div>
	);
};

export default Header