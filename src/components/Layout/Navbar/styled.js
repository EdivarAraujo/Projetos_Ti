import styled from 'styled-components'

export const ContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  padding: 0.3em;

  .list {
    display: flex;
    list-style: none;
    align-items: center;
  }
  .item {
    margin-right: 1em;
  }
  a {
    color: #000;
    text-decoration: none;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    a:hover {
      color: #ff5833;
    }
  }

  img {
    height: 65px;
  }
`
