import { ContainerStyled } from './styled'
function Container(props) {
  return (
    <ContainerStyled className={`${props.customClass}`}>
      {props.children}
    </ContainerStyled>
  )
}

export default Container
