import React from "react"
import styled from "styled-components"
const Link = props => {
  return <LinkStyle href={props.href}> {props.text} </LinkStyle>
}

const LinkStyle = styled.a`
  font-weight: bold;
  text-decoration: none;
  box-shadow: none;
`
export default Link
