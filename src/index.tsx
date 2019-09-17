import React, { useState, useEffect } from "react"
import { render } from "react-dom"
import QRCode from "qrcode"
import { chunk } from "./chunk"
import { Stripe } from "./Stripe"

const App = () => {
  const [text, setText] = useState("hello css gradient qr")
  const [rows, setRows] = useState([])
  useEffect(() => {
    const { modules } = QRCode.create(text)
    const _rows = chunk(modules.data, modules.size)
    setRows(_rows)
  }, [text])
  return (
    <div>
      hello
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        {rows.map((r, i) => (
          <Stripe key={i} data={r} />
        ))}
      </div>
    </div>
  )
}

render(<App />, document.querySelector("#root"))
