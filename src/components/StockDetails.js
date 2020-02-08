import React, {Fragment, useEffect,useState} from 'react';
import {Link} from "react-router-dom"
import {connect} from "react-redux";
import {startAddTicker, startRemoveTicker} from "../actions/actions.js";
import styled from "styled-components";
import {AppButton} from "./styled-components/StyledComponents.js";

const StockDetails = (props) => {
	const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${props.match.params.ticker}&apikey=${process.env.REACT_APP_API_KEY}`
	const news_url = `https://stocknewsapi.com/api/v1?tickers=${props.match.params.ticker}&items=5&token=${process.env.REACT_APP_NEWS_KEY}`
	const [result, updateResult] = useState({
		"01. symbol": "",
        "02. open": "",
        "03. high": "",
        "04. low": "",
        "05. price": "",
        "06. volume": "",
        "07. latest trading day": "",
        "08. previous close": "",
        "09. change": "",
        "10. change percent": ""
	});

	useEffect(() => {
		dataGrab();
	}, [])

	const [news, updateNews] = useState([]);

	const {
		"01. symbol": symbol, 
		"02. open": open, 
		"03. high": high,
        "04. low": low,
        "05. price": price,
        "06. volume": volume, 
        "08. previous close": close,
        "09. change": change,
        "10. change percent": change_percent
	} = result;

	const dataGrab = () => {
		// console.log(url);
		// fetch our stock information
		fetch(url, {
			method: "GET",
		}).then((response) => {
			return response.json();
		})
		.then((res) => {
			if(res["Global Quote"]){
				updateResult({...result, ...res["Global Quote"]});
			}
		})

		//fetch our stock news
		fetch(news_url, {
			method: "GET",
		}).then((response) => {
			return response.json();
		})
		.then((res) => {
			if(res.data){
				// console.log(res.data);
				updateNews(res.data);
			}
		})
	}


	const displayNumbers = () => {
		if(result){
			return (
				<Fragment>
					<div className="heading">
						<h1 className="stock-symbol">{symbol}</h1>
						{	props.watchlist.some(member => member.symbol === symbol) ? 
							(<AppButton backgroundColor="#FF8280" textColor="black" href="#" onClick={removeFromWatchlist} >
		                    	Remove
		                	</AppButton>) :
		                	(<AppButton backgroundColor="#96E6A1" textColor="black" href="#" onClick={addToWatchlist} >
			                    Add To Watchlist
			                </AppButton>)
	                	}
					</div>
					<div className="stockDetails">
						<div className="label">Price</div>
						<div className="current-price">{price}</div>
						<div className="label">Open</div>
						<div className="open-price">{open}</div>
						<div className="label">High</div>
						<div className="high-price">{high}</div>
						<div className="label">Low</div>
						<div className="low-price">{low}</div>
						<div className="label">Volume</div>
						<div className="volume">{volume}</div>
						<div className="label">Close</div>
						<div className="close-price">{close}</div>
						<div className="label">Change</div>
						<div className="price-change">{change}</div>
						<div className="label">% Change</div>
						<div className="percent-change">{change_percent}</div>
					</div>
				</Fragment>
				)
		}
		return <div>Nothing found</div>
	} 

	const displayNews = () => {
		if(news){
			return (
				<div className="news-section">
					{news.map((article, i) => {
						return (
							<a key={i} href={`${article.news_url}`} className="news-section">
								<div className="news-article">
									<img src={`${article.image_url}`} alt="article image" />
									<h3>{article.title}</h3>
									<div>{article.text}</div>
									<div>{article.date}</div>
								</div>	
							</a>						
						)
					})}
				</div>
			)
		}
	}

	const addToWatchlist = () => {
		props.addTickerProp(props.match.params.ticker, price);
	}

	const removeFromWatchlist = () => {
		//Add a way to get ID of the ticker and use it through this removeTickerProp
		props.removeTickerProp(props.match.params.ticker);
	}

	return (
		<DetailsDiv className="App"> 
			{displayNumbers()}
			{displayNews()}
		</DetailsDiv>
	);
}

const DetailsDiv = styled.div`
	width: 80%;
	margin 40px auto;

	.stockDetails {
		display: grid;
		width: 100%;
		max-width: 400px;
		grid-template-columns: repeat(2, 1fr);
	}

	.label {
		font-weight: bold;
	}

	.heading {
		width: 100%;
		display: grid;
		grid-template-columns: 3fr 1fr ;
		align-items: center;
	}

	.news-section {
		width: 100%;	
	}

	.news-section a {
		text-decoration: none;
		color: black;
	}

	.news-article {
		max-width: 700px;
		width: 80%;
		display: grid;
		grid-template-columns: 1fr;
		margin: 20px auto;
		border: 2px solid black;
		padding: 20px;
	}

	.news-article img {
		width: 100%;
	}


`

const mapStateToProps = (state) => {
	return {
		watchlist: state.watchlist
	};
};

const mapDispatchToProps = (dispatch) => ({
	addTickerProp: (symbol, price) => dispatch(startAddTicker(symbol, price)),
	removeTickerProp: (symbol, id) => dispatch(startRemoveTicker(symbol, id))
});

// const ConnectedStockDetails = connect(mapStateToProps)(StockDetails);

export default connect(mapStateToProps, mapDispatchToProps)(StockDetails);
