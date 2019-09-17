import React from "react"
import { render } from "react-dom"
import styled from "styled-components"

const toColor = (v) => (v ? "#000" : "#fff")
const Stripe = styled.div.attrs(({ data }) => {
  const division = 100 / data.length
  const linearGradient = data
    .reduce((acc, d, i) => {
      const per = division * i
      const color = toColor(d)
      const b = i !== 0 ? `${toColor(data[i - 1])} ${per}%` : null
      const n = `${color} ${per}%`
      return [...acc, b, n]
    }, [])
    .filter((i) => !!i)
    .join(",")
  return { linearGradient }
})`
  width: 100%;
  height: 1em;
  background: linear-gradient(90deg, ${({ linearGradient }) => linearGradient});
`
const App = () => {
  return (
    <div>
      <Stripe data={[0, 1]}></Stripe>
      <Stripe data={[0, 1, 0, 1]}></Stripe>
      <Stripe data={[0, 1, 0, 1, 0, 1, 0, 1]}></Stripe>
      <Stripe data={[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]}></Stripe>
      <Stripe
        data={[
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1
        ]}
      ></Stripe>
      hello
    </div>
  )
}

render(<App />, document.querySelector("#root"))
