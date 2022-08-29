import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
  color: #000;
  padding: 1.5em;
  text-align: center;

  .social_list {
    display: flex;
    justify-content: center;
    list-style-type: none;

    li {
      margin: 0 1em;
      &:hover {
        color: #ff5833;
      }
    }

    svg {
      font-size: 1.5em;
      cursor: pointer;
    }
  }

  .copy_right {
    margin-top: 1em;
  }
  .copy_right span {
    font-weight: bold;
    color: #000;
  }
`
