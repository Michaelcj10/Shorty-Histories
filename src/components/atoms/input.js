import React, { Fragment, useState } from "react"
import styled from "styled-components"
import Label from "./label"

const Input = props => {
  const [inputFocused, setFocused] = useState(false)

  return (
    <Fragment>
      <Label text={props.label} focused={inputFocused} />
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
  background: transparent;
`

export default Input
