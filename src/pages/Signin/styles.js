import styled from 'styled-components'
import img from '../../img/tijucaLogo.jpeg'
import logo from '../../img/projetoLogo.jpg'
export const Backgroud = styled.div`
  height: 100vh;
  width: 100%;
  background: url(${img});
  background-size: 100%;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
`
export const Layout = styled.div`
  box-sizing: border-box;
  width: 70%;
  display: flex;
  height: 75%;
  background: #fffee4;
  border: 1px solid #f7f7f7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 10px;
`
export const LogoProjeto = styled.div`
  height: 100%;
  width: 50%;
  background: url(${logo});
  background-size: cover;
  border-radius: 10px 0px 0px 10px;
`
export const Titulo = styled.h1`
  display: flex;
  align-items: flex-end;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  text-transform: capitalize;
  color: #143a70;
  p {
    margin-left: 20px;
    background-color: #143a70;
    width: 8vh;
    color: #fff;
    text-align: center;
  }
`
export const Campos = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5%;
  height: 100%;
  color: red;
`
export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  height: 70%;
  box-shadow: 0 1px 2px #0003;
  background-color: #143a70;
  max-width: 350px;
  padding: 20px;
  border-radius: 10px;
`
export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
`
export const LabelSignup = styled.label`
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
