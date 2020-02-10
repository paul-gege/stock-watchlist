import React, {Fragment, useEffect, useState} from 'react';
import styled from "styled-components";
import {startAddTicker, startRemoveTicker} from "../actions/actions.js";
import {connect} from "react-redux";
import {AppButton} from "./styled-components/StyledComponents.js";
import phone from "./phone.png";

const Watchlist = (props) => {
    const [phoneNumber, updatePhoneNumber] = useState(""); 

    const removeFromWatchlist = (value, id) => {
        console.log(id);
        props.removeTickerProp(value, id);
    }
    
    const sendSms = (watchlist, number) => {
        let message = "";
        watchlist.forEach((item) => {
            message = message.concat("\n", item.symbol, ": $" ,item.price, "\n");
        });
        console.log(message);
        fetch(`http://127.0.0.1:3000/send-message`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({message: message, phoneNumber: number})
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleChange = (event) => {
        updatePhoneNumber(event.target.value);
    }

    return (
        <WatchlistContentDiv>
            <div className="notification-input">
                <input type="text" value={phoneNumber} onChange={handleChange} placeholder="Phone Number"/>
                
                <AppButton className="app-button" backgroundColor="#FFE800" textColor="black" href="#"  onClick={() => sendSms(props.watchlist, phoneNumber)} >
                    Send To Me
                </AppButton>
            </div>
            <div className="stock-tickers">
                {props.watchlist.map((ticker, i) => {
                    return (
                    <div className="item" key={i}> 
                        <div className="ticker">{ticker.symbol}</div>
                        <div className="price">${ticker.price}</div>
                        <AppButton className="app-button"
                            backgroundColor="#A62662" 
                            textColor="white" href="#" 
                            onClick={() => removeFromWatchlist(ticker.symbol, ticker.id)} >
                            Remove
                        </AppButton>
                    </div> )
                })}
            </div>
        </WatchlistContentDiv>
    )

}

const WatchlistContentDiv = styled.div`
    background: rgb(254,200,92);
    background: linear-gradient(90deg, rgba(254,200,92,1) 0%, rgba(220,50,79,1) 35%, rgba(139,67,177,1) 100%);
    border-radius: 20px;
    width: 90%;
    max-width: 600px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
    color: white;

    .notification-input {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

    input {
        width: calc(100% / 2);
        border: none;
        border-radius: 0px;
        background-image: url(${phone});
        background-repeat: no-repeat;
        background-size: 7%;
        background-position: 98% center;
        padding-right: 60px;
        padding-left: 20px;
    }

    .stock-tickers {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
    }

    .item {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .item .ticker {
        font-weight: bold; 
        font-size: 30px;
    }

    .item .price {
        font-size: 20px;
    }

    @media (max-width: 768px) {
        .notification-input {
            flex-direction: column;
        }

        input {
            width: 100%;
        }

        .app-button {
            height: 40px;
            margin-top: 10px;
        }

        .stock-tickers {
            grid-template-columns: 1fr;
            grid-gap: 10px;
        }
    }

`


const mapStateToProps = (state) => {
    return {
        watchlist: state.watchlist
    };
};

const mapDispatchToProps = (dispatch) => ({
    removeTickerProp: (symbol, id) => dispatch(startRemoveTicker(symbol, id))
});


export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);