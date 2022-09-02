import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4em;
  background-image: none;

  h1 {
    font-size: 2.5em;
    margin-bottom: 0.5em;
  }

  span {
    color: #000;
    padding: 0 0.2em;
    background-color: #fff;
  }

  p {
    margin-bottom: 1.5em;
    color: #7b7b7b;
  }
  img {
    width: 850px;
    margin: 2em 0;
  }
`
