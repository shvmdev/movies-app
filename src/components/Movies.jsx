import React from "react";
import { Home} from "./Home/Home";
import Favourites from "./Favourites/Favourites"
import PageNotFound from "./PageNotFound/PageNotFound";
import { Route,Redirect,Switch } from "react-router-dom";

const Movies = () => {
	return (
		<>
			<Switch>
				<Route exact path="/home">
					<Home />
				</Route>
				<Route exact path="/favourites">
					<Favourites />
				</Route>
				<Redirect exact path="/" to="/home"></Redirect>
				<Route>
					<PageNotFound/>
				</Route>
			</Switch>
		</>
	);
};

export default Movies;
