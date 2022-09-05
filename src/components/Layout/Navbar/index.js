import { Link } from 'react-router-dom'
import Container from '../Container'
import logo from '../../../img/tec.png'
import { ContainerStyled } from './styled'

function Navbar() {
  return (
    <ContainerStyled>
      <Link to="/">
        <img src={logo} alt="Projetos" />
      </Link>
      <ul className="list">
        <li className="item">
          <Link to="/home">Inicio</Link>
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
        <li
          className="item"
          onClick={() => window.localStorage.removeItem('user_tokens')}
        >
          <Link to="/">Sair</Link>
        </li>
      </ul>
    </ContainerStyled>
  )
}
export default Navbar
