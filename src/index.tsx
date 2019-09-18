import React, { useState, useEffect } from "react"
import { render } from "react-dom"
import QRCode from "qrcode"
import { chunk } from "./chunk"
import { Stripe, Code as QrCode, generateQrCss } from "./Code"
import styled, { css } from "styled-components"

const PreviewPre = styled.pre`
  background: #ccc;
  padding: 1em;
  border-radius: 0.5em;
  width: 100%;
  white-space: pre-wrap;
`

const Preview = (props) => (
  <PreviewPre {...props}>{/* <PreviewCode  /> */}</PreviewPre>
)
const App = () => {
  const [text, setText] = useState(
    "https://github.com/terrierscript/example-linear-gradient-qr-code"
  )
  const [bits, setBits] = useState([])
  useEffect(() => {
    if (text === "") {
      return
    }
    const { modules } = QRCode.create(text)
    const _rows = chunk(modules.data, modules.size)
    setBits(_rows)
  }, [text])
  const QRcss = css(generateQrCss(bits))

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
        <QrCode
          code={[[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]}
        />
        <QrCode code={bits} />
        {/* {rows.map((r, i) => (
          <Stripe key={i} data={r} />
        ))} */}
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
