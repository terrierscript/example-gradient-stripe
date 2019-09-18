import styled from "styled-components"
import React from "react"

const Grid = styled.div<{ size: number; dot: number }>`
  display: grid;
  grid-template-columns: ${({ size, dot }) => `repeat(${size},${dot}px)`};
  grid-auto-columns: ${({ dot }) => dot}px;
  grid-auto-rows: ${({ dot }) => dot}px;
`

const Dot = styled.div``
const Black = styled(Dot)`
  background: black;
`
const White = styled(Dot)`
  background: white;
`
export const QrCodeGrid = ({ code }) => {
  return (
    <Grid size={code.length} dot={4}>
      {code.map((row) => row.map((value) => (value ? <Black /> : <White />)))}
    </Grid>
  )
}
