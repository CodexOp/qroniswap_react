import styled, { css } from 'styled-components';
import checkboxBG from './img/checkbox-bg.svg';

export const Main = styled.main`
  overflow: hidden;
`;

export const CBButtonA = styled.a`
  display: inline-block;
  padding: 10px 18px;
  height: 44px;
  background: var(--cb-button-bg-color, #FFFFFF);
  /* colour 2 */
  border: 1px solid var(--cb-button-border-color, #9F2DFE);
  /* Shadow/xs */
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  text-decoration: none;
  letter-spacing: 0.03rem;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${props => props.variant === 'primary' && css`
    --cb-button-bg-color: linear-gradient(95.08deg, #9F2DFE 6.71%, #3BB2F9 111.09%);
    --cb-button-border-color: transparent;
    color: white;
    border: 0;

    &:hover{
      color: white;
    }
  `}

  ${props => props.light && css`
    background: white;
    color: black;
  `}
`


export const CBCheckbox = styled.div`

  input[type="checkbox"]{
    display: none;
  }

  label{
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.01px;
    color: #fff;
    position: relative;
    padding-left: 30px;
    cursor: pointer;


    &:before{
      position: absolute;
      content: "";
      width: 20px;
      height: 20px;
      background: url('${checkboxBG}');
      background-size: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }

    
    &:after{
      position: absolute;
      content: "";
      left: 7px;
      top: 50%;
      width: 5px;
      height: 10px;
      border-bottom: 2px solid #fff;
      border-right: 2px solid #fff;
      transform: translateY(calc(-50% - 1px)) rotate(45deg);
      visibility: none;
      opacity: 0;
    }
  }

  input[type="checkbox"]:checked ~ label:after{
    visibility: visible;
    opacity: 1;
  }
  
`
