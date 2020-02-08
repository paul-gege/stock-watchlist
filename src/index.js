import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router.js';
import {store} from "./store.js"
import {Provider} from "react-redux";
import {firebase} from "./firebase/firebase.js";
import {history} from "./Router.js";
import {login, logout} from "./actions/auth.js";
import {startSetWatchList} from "./actions/actions.js";
import "./styles/normalize.css";
import "./styles/styles.css"

let hasRendered = false;
const renderApp = () => {
	if(!hasRendered){
		ReactDOM.render(
			<Provider store={store}>
				<Router />
			</Provider>, 
			document.getElementById('root'));
	}
}

firebase.auth().onAuthStateChanged((user) => {
	if(user){
		store.dispatch(login(user.uid));
		store.dispatch(startSetWatchList()).then(() => {
			renderApp();
			if(history.location.pathname === '/signin') {
				history.push('/watchlist');
			}
		})
	} else {
		store.dispatch(logout());
		renderApp();
		history.push("/signin");
	}
})

