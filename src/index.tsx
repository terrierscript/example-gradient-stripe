import React, { useState, useEffect } from "react"
import { render } from "react-dom"
import QRCode from "qrcode"
import { chunk } from "./chunk"
import { Stripe, Code } from "./Stripe"

const App = () => {
  const [text, setText] = useState(
    "https://github.com/terrierscript/example-linear-gradient-qr-code"
  )
  const [rows, setRows] = useState([])
  useEffect(() => {
    if (text === "") {
      return
    }
    const { modules } = QRCode.create(text)
    const _rows = chunk(modules.data, modules.size)
    setRows(_rows)
  }, [text])
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
        <Code code={rows} />
        {/* {rows.map((r, i) => (
          <Stripe key={i} data={r} />
        ))} */}
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
