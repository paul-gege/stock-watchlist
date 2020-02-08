import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import App from "./components/App.js";
import StockDetails from "./components/StockDetails.js";
import Menu from "./components/Menu.js";
import Watchlist from "./components/Watchlist.js";
import Signin from "./components/Signin.js";
import createHistory from "history/createBrowserHistory";
import PrivateRoute from "./PrivateRoute.js";
import PublicRoute from "./PublicRoute.js";

export const history = createHistory();

const Router = () => {
	return (

		<BrowserRouter history={history}>
			<Menu />
			<Switch>
				<PrivateRoute path="/" component={App} exact/>
				<PublicRoute path="/signin" component={Signin} exact/>
				<PrivateRoute path="/watchlist" component={Watchlist} exact/>
				<PrivateRoute path="/:ticker" component={StockDetails} exact/>
			</Switch>
		</BrowserRouter>		
	
	)
}

export default Router;