import styled from 'styled-components'

export const ContainerStyled = styled.div`
  padding: 1% 0;

  h1 {
    background-color: #000;
    color: #fff;
    padding: 0.4em;
    margin-bottom: 0.5em;
  }
  h2 p {
    margin-bottom: 0.5em;
  }

  span {
    font-weight: bold;
  }

  .form_container {
    border-bottom: 1px solid #000;
    margin-bottom: 1.2em;
    padding-bottom: 1.2em;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .btn {
    background-color: #000;
    color: #fff;
    padding: 0.5em 1em;
    text-decoration: none;
    transition: 0.5s;
    cursor: pointer;
    max-height: 40px;
    border-radius: 1px;
    &:hover {
      color: #ff5833;
    }
  }

  .project_info {
    width: 100%;
  }

  .tableMaterial {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    td {
      border: 1px solid #ddd;
      padding: 5px;
      background-color: #fff;
      text-align: center;
      border-color: #0e0c0c;
    }

    th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: center;
      background-color: #ffff;
      color: #fff;
      background-color: rgb(11, 12, 10);
    }

    tr:nth-child(event) {
      background-color: #f2f2f2;

      &:hover {
        background-color: #ddd;
      }
    }
  }

  .buttonRemoveMaterial {
    width: 5rem;
    background-color: #00bfff;
    height: 2.5em;
    border-radius: 10px;
    border: 1px solid #dddddd;

    &:hover {
      background-color: rgb(226, 64, 64);
    }

    span {
      color: #fff;
    }
  }
`

// .project_materialHeader {
//   margin-top: 0.5%;
//   margin-bottom: 0.5%;
//   text-align: center;
//   border: 1px solid;
//   padding: 2px;
//   display: flex;
//   flex-direction: row;
// }
