import React from "react";
import {startLogin} from "../actions/auth.js";
import {connect} from "react-redux";
import styled from "styled-components";
import {AppButton} from "./styled-components/StyledComponents.js";
import google from "./google.png";
import logo from "./logo.png";

const Signin = ({startLogin}) => {
	return (
		<ContainerDiv>
			<div className="login-details">
				<img src={logo} alt="stockex logo" />		
				<h1>Stonks</h1>
			</div>
			<div className="button">
				<AppButton imageUrl={google} backgroundColor="#FFE800" textColor="black" onClick={startLogin}>
					Login
					<img src={google} alt="google logo" />		
				</AppButton>
			</div>
		</ContainerDiv>
	)
}

const ContainerDiv = styled.div`
	width: 90%;
	border-radius: 20px;
	max-width: 800px;
	margin: 20px auto;
	display: grid;
	grid-template-columns: 2fr 1fr;
	justify-items: center;
	align-items: center;
	padding: 20px;
	background: rgb(254,200,92);
	background: linear-gradient(90deg, rgba(254,200,92,1) 0%, rgba(220,50,79,1) 35%, rgba(139,67,177,1) 100%);
	color: white;
	
	.login-details {
		height: 100vw;
		max-height: 500px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.login-details img {
		width: 50%;
	}

	.button {
		width: 100%;
		max-width: 200px;
	}

	.button img {
		width: 4vw;
		max-width: 20px;
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		.login-details {
			max-height: 200px;
		}
	}
`

const mapDispatchToProps = (dispatch) => ({
	startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(Signin);