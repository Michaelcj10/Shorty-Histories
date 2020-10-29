import React from "react"
import styled from "styled-components"
const SecondaryButton = props => {
  return <ButtonStyle onClick={props.onClick}>{props.text}</ButtonStyle>
}

const ButtonStyle = styled.button`
  background: #fff;
  color: #007acc;
  border: 1px solid #007acc;
  height: 35px;
  min-width: 155px;
  transition: all 0.5s ease 0s;
  outline: none;
  font-size: 16px;
  font-family: Montserrat, sans-serif;
  font-weight: 900;
  margin-top: 15px;
  width: fit-content;
  line-height: 35px;
  text-align: center;
  cursor: pointer;
`
export default SecondaryButton
