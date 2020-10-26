import React, { Fragment, useState } from "react"
import styled from "styled-components"
const Input = props => {
  const [inputFocused, setFocused] = useState(false)

  return (
    <Fragment>
      <Label
        style={{
          fontSize: inputFocused ? "15px" : "14px",
          color: inputFocused ? "rgb(70, 194, 147)" : "#191919",
        }}
      >
        {props.label}
      </Label>
      <InputStyle
        style={{
          borderBottom: inputFocused
            ? "1px solid rgb(70, 194, 147)"
            : "1px solid #191919",
        }}
        placeholder={props.placeholder}
        onChange={e => {
          props.onChange(e.currentTarget.value)
        }}
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={() => {
          setFocused(false)
        }}
        value={props.value}
      />
    </Fragment>
  )
}

const InputStyle = styled.input`
  width: 100%;
  border: none;
  transition: all 0.4s;
  outline: none;
`
const Label = styled.label`
  color: #191919;
  font-family: "Merriweather", "Georgia", serif;
  font-weight: 900;
  text-rendering: optimizeLegibility;
  font-size: 1.4427rem;
  line-height: 1.1;
  transition: all 0.2s;
`
export default Input
