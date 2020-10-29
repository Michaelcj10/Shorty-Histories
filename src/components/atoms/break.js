import React from "react"
import styled from "styled-components"
const Break = props => {
  return <BreakStyle style={{ background: "rgb(31 31 31)" }} />
}

const BreakStyle = styled.div`
  margin: 20px 0px;
  height: 3px;
  width: 15%;
`
export default Break
