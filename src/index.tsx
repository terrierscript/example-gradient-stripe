import React, { useState, useEffect, useRef } from "react"
import { render } from "react-dom"
import QRCode from "qrcode"
import { chunk } from "./chunk"
import { Stripe, Code as QrCode, generateQrCss } from "./Code"
import styled, { css } from "styled-components"
import { QrCodeGrid } from "./QrCodeGrid"
import { Flex, Box } from "reflexbox"

const PreviewContainer = styled.div`
  background: #ccc;
  padding: 1em;
  border-radius: 0.5em;
`
const PreviewPre = styled.pre`
  font-size: 8px;
  box-sizing: border-box;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-all;
  height: ${({ height }) => height};
  overflow-y: ${({ overflow }) => overflow};
`
const ExpandMessage = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;
`

const Preview = ({ children, ...props }) => {
  const [expand, setExpand] = useState(false)
  const overflow = expand ? "auto" : "scroll"
  const height = expand ? "auto" : "20em"
  return (
    <PreviewContainer>
      <PreviewPre
        onClick={() => setExpand((curr) => !curr)}
        overflow={overflow}
        height={height}
        {...props}
      >
        {children}
      </PreviewPre>
      {!expand && <ExpandMessage>(click to expand)</ExpandMessage>}
    </PreviewContainer>
  )
}
const App = () => {
  const [text, setText] = useState(
    "https://github.com/terrierscript/example-linear-gradient-qr-code"
  )
  const [bits, setBits] = useState([])
  const [QRcss, setQrcss] = useState("")
  const [dataUrl, setDataUrl] = useState("")
  const canvasRef = useRef(null)
  useEffect(() => {
    if (text === "") {
      return
    }
    QRCode.toDataURL(text).then((url) => {
      console.log(url)
      setDataUrl(url)
    })
    // if (canvasRef.current) {
    //   console.log(canvasRef.current)
    //   QRCode.toCanvas((canvasRef.current, text), function(err) {
    //     console.error(err)
    //   })
    // }
    const { modules } = QRCode.create(text)
    const _rows = chunk(modules.data, modules.size)
    setBits(_rows)
  }, [text])
  useEffect(() => {
    setQrcss(css(generateQrCss(bits)))
  }, [bits])
  // console.log(QRcss)
  return (
    <Box p={1}>
      <h1>QR Code Generator only CSS Linear Gradient</h1>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => setText("")}>Clear</button>
      </div>
      <div>
        {/* <QrCode
          code={[[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]}
        /> */}
        <div>
          <h3>with linear-gradient</h3>
          <Flex>
            <Box width={1 / 3}>
              <QrCode code={bits} />
            </Box>
            <Box width={2 / 3}>
              <Preview>{QRcss}</Preview>
            </Box>
          </Flex>
        </div>
        <div>
          <h3>with Image (node-qrcode)</h3>
          <Flex>
            <Box width={1 / 3}>
              <img src={dataUrl} />
            </Box>
            <Box width={2 / 3}>
              <Preview>{dataUrl}</Preview>
            </Box>
          </Flex>
        </div>
        <div>
          <h3>with CSS Grid </h3>
          <Flex>
            <Box width={1}>
              <QrCodeGrid code={bits} />
            </Box>
          </Flex>
        </div>
        {/* {rows.map((r, i) => (
          <Stripe key={i} data={r} />
        ))} */}
      </div>
      <div>
        <a href="https://github.com/terrierscript/example-linear-gradient-qr-code">
          Source Code
        </a>
      </div>
    </Box>
  )
}

render(<App />, document.querySelector("#root"))
