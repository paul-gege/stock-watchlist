import React, {Fragment} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import styled from "styled-components"
import {startLogin, startSignout} from "../actions/auth.js";
import {connect} from "react-redux"


const Menu = ({history, startSignout, isAuthenticated}) => {

     return (
        <NavBarDiv>
            <ul className="unordered-nav">
                <li>
                    <NavLink className="nav-link" to="/" exact activeClassName="navSelect"> 
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/watchlist" exact activeClassName="navSelect"> 
                        Watchlist
                    </NavLink>
                </li>
                {  isAuthenticated ?  <li onClick={startSignout}>
                        Sign-out
                    </li> : ""  }
            </ul>
        </NavBarDiv>
    )
}

const NavBarDiv = styled.div`
    margin: 0px auto;
    border-radius: 0px 0px 20px 20px;
    width: 90%;
    max-width: 900px;
    height: 40px;
    background: rgb(254,200,92);
    background: linear-gradient(90deg, rgba(254,200,92,1) 0%, rgba(220,50,79,1) 35%, rgba(139,67,177,1) 100%);
    color: white;
    display: flex;
    justify-content: center;
    font-weight: bold;

    .navSelect {
        text-decoration: overline;
    }

    ul.unordered-nav {
        display: flex;
        width: 100%;
        0%;
        height: 100%;
        list-style: none;
        margin: 0px;
        padding: 0px;
        justify-content: space-around;;
        align-items: center;
    }

    a {
        text-decoration: none;
        color: white;
    }

    li {
        width: 30%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const mapDispatchToProps = (dispatch) => ({
    startSignout: () => dispatch(startSignout())
});

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.uid ? true : false
    }
}

const WrappedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu)

export default withRouter(WrappedMenu);
