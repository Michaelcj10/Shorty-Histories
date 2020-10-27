import React from "react"
import styled from "styled-components"
const Button = props => {
  return <ButtonStyle>{props.text}</ButtonStyle>
}

const ButtonStyle = styled.div`
  height: 35px;
  border: none;
  min-width: 155px;
  transition: all 0.5s ease 0s;
  background: #169b62;
  outline: none;
  font-size: 16px;
  color: rgb(255, 255, 255);
  font-family: Montserrat, sans-serif;
  font-weight: 900;
  margin-top: 15px;
  width: fit-content;
  line-height: 35px;
  text-align: center;
  cursor: pointer;
`
export default Button
