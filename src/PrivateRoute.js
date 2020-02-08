import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

export const PrivateRoute = ({isAuthenticated, component:Component, ...rest}) => {
	return (
		<Route {...rest} render={(props) => {
			return (
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to="/signin"/>
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

export default connect(mapStateToProps)(PrivateRoute);