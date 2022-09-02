import styled from 'styled-components'

export const ContainerStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  flex-wrap: wrap;

  .min-height {
    min-height: 75%;
  }
  .start {
    justify-content: flex-start;
  }
  .column {
    flex-direction: column;
    justify-content: flex-start;
  }
`
