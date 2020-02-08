import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"

const removeItem = (array, item) => {
	return array.filter((content)=> {
		return content.symbol !== item
	});
}

const watchlistReducer = (state=[], action) => {

	switch(action.type) {
		case "SET_WATCHLIST":
			return action.watchlist
		case "ADD_TICKER":
			return state.some(member => member.symbol === action.ticker) ? state : [...state, {id: action.id, symbol: action.ticker, price: action.price }]
		case "REMOVE_TICKER":
			return removeItem(state, action.ticker)
		default:
			return state;
	}
}


const authReducer = (state={}, action) => {
	switch(action.type){
		case 'LOGIN':
			return {
				uid: action.uid
			};
		case 'LOGOUT':
			return {}
		default:
			return state;
	};
};

// state.watchlist.splice(state.watchlist.indexOf(action.ticker), 1)



export const store = createStore(combineReducers({watchlist: watchlistReducer, auth: authReducer}), applyMiddleware(thunk));