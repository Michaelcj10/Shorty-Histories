import React, { Fragment, useState } from "react"
import styled from "styled-components"
const Label = props => {
  return (
    <StyledLabel
      style={{
        fontSize: props.focused ? "15px" : "14px",
        color: props.focused ? "rgb(70, 194, 147)" : "#191919",
      }}
    >
      {props.text}
    </StyledLabel>
  )
}

const StyledLabel = styled.label`
  color: #191919;
  font-family: "Merriweather", "Georgia", serif;
  font-weight: 900;
  text-rendering: optimizeLegibility;
  font-size: 1.4427rem;
  line-height: 1.1;
  transition: all 0.2s;
`
export default Label
