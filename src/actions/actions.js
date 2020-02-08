import database from "../firebase/firebase.js";

export const addTicker = (id, ticker, price) => {
	return {
		type: "ADD_TICKER",
		id: id,
		ticker: ticker, 
		price: price
	}
}

export const startAddTicker = (ticker, price) => {
	return (dispatch, getState) => {
		const userId = getState().auth.uid;
		const watchlist = getState().watchlist;
		if(!(watchlist.some(member => member.symbol === ticker))){
			const stockData = {symbol: ticker, price: price};
			database.ref(`users/${userId}/watchlist`).push(stockData).then((ref) => {
				dispatch(addTicker(ref.key, ticker, price));
			});
		}
	};
};

export const removeTicker = (ticker) => {
	return {
		type: "REMOVE_TICKER",
		ticker: ticker
	}
}

export const startRemoveTicker = (ticker, id) => {
	return (dispatch, getState) => {
		const userId = getState().auth.uid;
		database.ref(`users/${userId}/watchlist/${id}`).remove().then((ref) => {
			dispatch(removeTicker(ticker));
		});
	}
}

export const setWatchlist = (watchlist) => {
	return {
		type: 'SET_WATCHLIST',
		watchlist: watchlist
	}
}

export const startSetWatchList = () => {
	return (dispatch, getState) => {
		const userId = getState().auth.uid;
		return database.ref(`users/${userId}/watchlist`).once("value").then((snapshot) => {
			const watchlist = [];
			snapshot.forEach((childSnapshot) => {
				watchlist.push({
					id: childSnapshot.key,
					symbol: childSnapshot.val().symbol,
					price: childSnapshot.val().price
				});
			});

			dispatch(setWatchlist(watchlist));
		})
	}
}