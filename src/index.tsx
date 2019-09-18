import React, { useState, useEffect, useRef } from "react"
import { render } from "react-dom"
import QRCode from "qrcode"
import { chunk } from "./chunk"
import { Stripe, Code as QrCode, generateQrCss } from "./Code"
import styled, { css } from "styled-components"

const PreviewPre = styled.pre`
  background: #ccc;
  padding: 1em;
  border-radius: 0.5em;
  font-size: 8px;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-all;
`

const Preview = (props) => (
  <div>
    <PreviewPre {...props}>{/* <PreviewCode  /> */}</PreviewPre>
  </div>
)
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
    <div>
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
        <canvas ref={canvasRef}></canvas>
        {/* <QrCode
          code={[[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]}
        /> */}
        <QrCode code={bits} />
        <div>
          <img src={dataUrl} />
        </div>
        {/* {rows.map((r, i) => (
          <Stripe key={i} data={r} />
        ))} */}
        <Preview>{dataUrl}</Preview>
        <Preview>{QRcss}</Preview>
      </div>
      <div>
        <a href="https://github.com/terrierscript/example-linear-gradient-qr-code">
          Source Code
        </a>
      </div>
    </div>
  )
}

render(<App />, document.querySelector("#root"))
