import { Link } from 'react-router-dom'
import Container from './Container'
import logo from '../../img/tec.png'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img style={{ height: 65 }} src={logo} alt="Projetos" />
        </Link>
        <ul className={styles.list}>
          <li class={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/project">Projetos</Link>
          </li>
          <li className={styles.item}>
            <Link to="/sector">Setores</Link>
          </li>
          <li className={styles.item}>
            <Link to="/material">Material</Link>
          </li>
          <li className={styles.item}>
            <Link to="/colaboradores">Colaboradores</Link>
          </li>
        </ul>
      </Container>
    </nav>
  )
}
export default Navbar
