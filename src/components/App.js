import React, {useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components"; 
import search from "./search.png";


const App = () => {
	const [search, updateSearch] = useState("microsoft");
	const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${process.env.API_KEY}`;
	const [results, updateResults] = useState([]);

	const dataFetch = () => {
		fetch(url, {
			method: "GET",
		}).then((response) => {
			return response.json();
		})
		.then((res) => {
			if(res.bestMatches){
				updateResults(res.bestMatches);
			}
		})
	}

	useEffect(() => {
		dataFetch();
	}, [])


	const displayResults = () => {
		if(results){
			return results.map((result, i) => {
				return (
					<div key={i} className="stock-item">
						<Link className="view-btn"  to={`/${result["1. symbol"]}`}>
							<div  className="stockPreview">
								<div className="stock-symbol">{result["1. symbol"]}</div>
								<div className="stock-name">{result["2. name"]}</div>
								<div className="stock-region">{result["4. region"]}</div>
								<div className="stock-type">{result["3. type"]}</div>
							</div>
						</Link>
					</div>
				)
			})
		} 

		return <div>Nothing found</div>
	} 

	const handleChange = (event) => {
		updateSearch(event.target.value);
	}

	const handleEnter = (event) => {
		if(event.key === "Enter") {
			dataFetch();
		}
	}

	return (
		<SearchDiv>
			<div className="search-bar">
				<input type="text" placeholder="Search" value={search} onChange={handleChange} onKeyPress={handleEnter}/>
			</div>
			<div className="results">
				{displayResults()}
			</div>
		</SearchDiv>
	);
}

const SearchDiv = styled.div`
	background: rgb(254,200,92);
	background: linear-gradient(90deg, rgba(254,200,92,1) 0%, rgba(220,50,79,1) 35%, rgba(139,67,177,1) 100%);
    width: 90%;
   	max-width: 600px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
    align-items: center;
	color: white;
	border-radius: 20px;

    .stockPreview {
    	width: 100%;
    	display: grid;
    	grid-template-columns: 1fr;
    }

    .stock-symbol {
    	display: flex;
		align-items: center;
    	grid-row-start: span 3;
    	font-weight: bold;
    }

    .search-bar {
    	width: 70%;
    	max-width: 500px;
    	height: 40px;
    	margin-bottom: 20px;
    }

    .search-bar input{
    	width: 100%;
    	height: 100%;
		border: none;
        border-radius: 0px;
        background-image: url(${search});
        background-repeat: no-repeat;
        background-size: 5%;
        background-position: 98% center;
        padding-right: 60px;
        padding-left: 20px;
    }

    .results {
    	width: 100%;
    	display: grid;
    	grid-template-columns: 1fr;
    	grid-gap: 10px;
    	justify-items: center;
    	align-items: center;
    }

    .stock-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
    }
	
	.view-btn {
		border-radius: 20px;
		color: white;
		width: 100%;
	    top: 0;
	    left: 0;
	    transition: all .15s linear 0s;
	    position: relative;
	    display: inline-block;
	    padding: 15px 25px;
	    background-color: #F2884B;
		text-align: center;
	    text-transform: uppercase;
	    font-family: arial;
	    letter-spacing: 1px;

	    box-shadow: -6px 6px 0 #181240;
	    text-decoration: none;

	    &:hover {
		    top: 3px;
		    left: -3px;
		    box-shadow: -3px 3px 0 #181240;
		    background-color: orange;
		}

	    &::after {
	        top: 1px;
	        left: -2px;
	        width: 4px;
	        height: 4px;
	    }

	    &::before {
	        bottom: -2px;
	        right: 1px;
	        width: 4px;
	        height: 4px;
	    }

	    &:active.btn {
	        top: 6px;
	        left: -6px;
	        box-shadow: none;

	        &:before {
	            bottom: 1px;
	            right: 1px;
	        }

	        &:after {
	            top: 1px;
	            left: 1px;
	        }
	    }
	}

`

export default App;
