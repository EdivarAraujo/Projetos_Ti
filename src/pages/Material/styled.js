import styled from 'styled-components'

export const Container = styled.div`
  padding-bottom: 1.2em;
  width: 100%;
  margin-top: 4%;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    font-size: large;
    font-weight: bold;
    margin-top: 10px;
  }

  .mat {
    padding: 1px solid;
    width: 50%;
    height: 40px;
    text-align: center;
    margin-left: 5px;
    border-radius: 3px;
    border: 1px solid #000;
    outline: 0;
  }

  .qtd {
    width: 7%;
    height: 40px;
    margin-right: 10%;
    padding: 1px solid;
    text-align: center;
    margin-right: 0;
    border-radius: 3px;
    outline: 0;
    border: 1px solid #000;
  }

  .vlr {
    text-align: center;
    height: 40px;
    border-radius: 3px;
    outline: 0;
    border: 1px solid #000;
  }

  button {
    background-color: #000;
    color: #fff;
    padding: 0.5em 1em;
    text-decoration: none;
    transition: 0.5s;
    cursor: pointer;
    max-height: 40px;
  }
`
