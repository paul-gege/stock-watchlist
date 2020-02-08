import {firebase, googleAuthProvider} from "../firebase/firebase.js";

export const startLogin = () => {
	return () => {
		// console.log("here");
		return firebase.auth().signInWithPopup(googleAuthProvider);
	};
};

export const login = (uid) => {
	console.log("login");
	return {
		type: "LOGIN",
		uid: uid
	};
};

export const startSignout = () => {
	return () => {
		return firebase.auth().signOut();
	};
};

export const logout = () => {
	return {
		type:'LOGOUT'
	};
};

