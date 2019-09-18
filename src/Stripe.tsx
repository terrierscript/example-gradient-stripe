import styled from "styled-components"

const toColor = (v) => (v ? "#000" : "#fff")

const generateGradient = (data) => {
  const division = 100 / data.length
  return data
    .reduce((acc, d, i) => {
      const per = division * i
      const color = toColor(d)
      const b = i !== 0 ? `${toColor(data[i - 1])} ${per}%` : null
      const n = `${color} ${per}%`
      return [...acc, b, n]
    }, [])
    .filter((i) => !!i)
    .join(",")
}
export const Stripe = styled.div.attrs(({ data }) => {
  const linearGradient = generateGradient(data)
  return {
    width: `${data.length / 2}em`,
    style: { background: `linear-gradient(90deg, ${linearGradient})` }
  }
})`
  width: ${({ width }) => width};
  height: 0.5em;
`
