import styled from "styled-components"

const round = (value, base = 8) => {
  // return value
  return Math.round(value * base) / base
}
const toColor = (v) => (v ? "#000" : "#fff")
// const toColor = (v) => (v ? "red" : "blue")

const generateGradient = (data) => {
  const division = 100 / data.length
  return data
    .reduce((acc, d, i) => {
      const per = round(division * i)
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

export const generateQrCss = (code) => {
  const rowDivision = 100 / code.length
  const backgroundImage = code.map((data) => {
    const linearGradient = generateGradient(data)
    return `linear-gradient(90deg, ${linearGradient})`
  })
  // .join(",")
  const backgroundSize = `auto ${round(rowDivision)}%`
  const positionDivision = 100 / (code.length - 1)
  const backgroundPosition = code.map((_, i) => {
    return `left ${round(positionDivision * i)}%`
  })
  // .join(",")
  const background = [
    backgroundImage.map((img, i) => {
      const pos = backgroundPosition[i]
      return `${img} ${pos}`
    }),
    backgroundSize
  ].join(" ")
  return {
    backgroundImage,
    backgroundPosition,
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
