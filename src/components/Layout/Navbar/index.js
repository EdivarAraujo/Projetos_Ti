import { Link } from 'react-router-dom'
import Container from '../Container'
import logo from '../../../img/tec.png'
import { ContainerStyled } from './styled'

function Navbar() {
  return (
    <ContainerStyled>
      <Container>
        <Link to="/">
          <img src={logo} alt="Projetos" />
        </Link>
        <ul className="list">
          <li className="item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="item">
            <Link to="/project">Projetos</Link>
          </li>
          <li className="item">
            <Link to="/sector">Setores</Link>
          </li>
          <li className="item">
            <Link to="/material">Material</Link>
          </li>
          <li className="item">
            <Link to="/colaboradores">Colaboradores</Link>
          </li>
        </ul>
      </Container>
    </ContainerStyled>
  )
}
export default Navbar
