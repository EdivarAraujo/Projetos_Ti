import styled from 'styled-components'
import img from '../../img/tijucaLogo.jpeg'

export const Container = styled.div`
  background: url(${img});
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
`
export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #000300;
  background-color: #143a70;
  max-width: 350px;
  padding: 20px;
  border-radius: 10px;
`
export const Label = styled.label`
  font-size: 35px;
  font-weight: 600;
  color: #ffffff;
`
export const LabelSignin = styled.label`
  font-size: 16px;
  color: #ffffff;
`
export const LabelError = styled.label`
  font-size: 14px;
  color: red;
`
export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #ffffff;
  }
`
