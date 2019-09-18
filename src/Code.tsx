import styled from "styled-components"

const round = (value, base = 1) => {
  return `${Math.round(value * 10 ** base) / 10 ** base}%`
}
const toColor = (v) => (v ? "#000" : "#fff")

const generateGradient = (data) => {
  const division = 100 / data.length
  return data
    .reduce((acc, d, i) => {
      const per = round(division * i)
      const before = i !== 0 ? `${toColor(data[i - 1])} ${per}` : null
      const current = `${toColor(d)} ${per}`
      return [...acc, before, current]
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

export const generateQrCss = (code) => {
  const rowDivision = 100 / code.length
  const backgroundImage = code.map((data) => {
    const linearGradient = generateGradient(data)
    return `linear-gradient(90deg, ${linearGradient})`
  })
  // .join(",")
  const backgroundSize = code.map(
    (_, i) => `auto ${round(rowDivision * (i + 1))}`
  )
  return {
    backgroundImage,
    backgroundSize
  }
}

export const Code = styled.div.attrs(({ code }) => {
  return {
    width: `${code.length / 2}em`,
    height: `${code.length / 2}em`
  }
})`
  ${({ code }) => generateQrCss(code)};
  background-repeat: no-repeat;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`
