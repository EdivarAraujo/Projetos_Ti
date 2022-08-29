import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
  padding: 1em;
  border: 1px solid #7a7a7a;
  border-radius: 2px;
  width: 24%;
  margin: 0.5%;

  h4 {
    background-color: #222;
    color: #fff;
    padding: 0.4em;
    margin-bottom: 1.3em;
    font-size: 1.3em;
  }
  p {
    color: #000;
    margin-bottom: 1em;
    span {
      font-weight: bold;
    }
  }
  .category_text {
    display: flex;
    align-items: center;
    span {
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      /* background-color: rgb(241, 125, 16); */
      margin-right: 5px;
    }
  }
  .category_text .infraestrutura {
    background-color: #000;
  }
  .category_text .desenvolvimento {
    background-color: #37811a;
  }
  .design {
    background-color: #97150a;
  }
  .planejamento {
    background-color: #c01dad;
  }
  .project_card_actions {
    margin-top: 1.2em;
    display: flex;
    align-items: center;
    .linkButton {
      text-decoration: none;
      border: none;
      background-color: #123a68;
      color: #fff;
      font-size: 0.9em;
      padding: 0.6em 1em;
      margin-right: 1em;
      cursor: pointer;
      border: 1px solid #222;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.5s;
      border-radius: 5px;
    }
    button {
      text-decoration: none;
      border: none;
      background-color: #123a68;
      color: #fff;
      font-size: 0.9em;
      padding: 0.6em 1em;
      margin-right: 1em;
      cursor: pointer;
      border: 1px solid #222;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.5s;
      border-radius: 5px;
    }
    svg {
    }
    margin-right: 0.5em;
    a:hover,
    button:hover {
      background-color: #222;
      color: #ffbb33;
    }
  }
`
