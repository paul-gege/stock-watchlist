import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

//used to either display login page or not
export const PublicRoute = ({isAuthenticated, component:Component, ...rest}) => {
	return (
		<Route {...rest} component={(props) => {
			return (
				isAuthenticated ? (
					<Redirect to="/watchlist"/>
				) : (
					<Component {...props} />
				)
			)
		}} />	
	)
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.uid ? true : false
	};
};

export default connect(mapStateToProps)(PublicRoute);