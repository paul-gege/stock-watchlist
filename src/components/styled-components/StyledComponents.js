import styled from 'styled-components';

export const AppButton = styled.a`
    margin-left: 10px;
    top: 0;
    left: 0;
    transition: all .15s linear 0s;
    position: relative;
    display: inline-block;
    padding: 15px 25px;
    background-color: ${(props) => (props.backgroundColor)};

    text-transform: uppercase;
    color: ${(props) => (props.textColor)};
    font-family: arial;
    letter-spacing: 1px;

    box-shadow: -6px 6px 0 #181240;
    text-decoration: none;
    display: flex;
    justify-content: space-around;
    align-items: center;


    &:hover {
        top: 3px;
        left: -3px;
        box-shadow: -3px 3px 0 #181240;
        cursor: pointer;
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

`