import * as React from "react"
import { useState, Fragment, useRef, useEffect } from "react"
import styled from "styled-components"

const First = styled.div`
  background: #bbbbbb38;
  width: 80%;
  height: 40px;
  margin: auto;
  border-radius: 40px 31px 48px 51px;
  padding-top: 20px;
  margin-top: 20px;
`

const Second = styled.div`
  background: #bbbbbb38;
  margin-top: 50px;
  width: 50%;
  height: 40px;
  margin: auto;
  border-radius: 40px 31px 48px 51px;
  margin-top: 20px;
`

const Third = styled.div`
  background: #bbbbbb38;
  width: 30%;
  height: 30px;
  margin: auto;
  border-radius: 40px 31px 48px 51px;
  margin-top: 20px;
`

const Forth = styled.div`
  background: #ffffff;
  width: 50%;
  height: 50%;
  margin: auto;
  border-radius: 50%;
`

const ImageLoader = props => {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true)
    }
  }, [])

  return (
    <div>
      {!loaded && (
        <div
          style={{
            height: props.height,
            width: props.width,
            background: "#fbfbfb",
            borderRadius: "40px 31px 48px 51px",
            paddingTop: "20px",
            marginTop: "20px",
            marginBottom: "1.75rem",
          }}
        >
          {props.isCircle ? (
            <Forth />
          ) : (
            <Fragment>
              <First />
              <Second />
              <Third />
            </Fragment>
          )}
        </div>
      )}
      <img
        ref={imgRef}
        style={{
          display: loaded ? "block" : "none",
          height: props.height,
          width: props.width,
          borderRadius: props.isCircle ? "50%" : "0px",
        }}
        onLoad={() => {
          console.log(loaded, props.imgSrc)
          setLoaded(true)
        }}
        src={props.imgSrc}
        alt={props.imgAlt}
      />
    </div>
  )
}

export default ImageLoader
