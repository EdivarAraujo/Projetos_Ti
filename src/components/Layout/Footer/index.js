import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Container } from './styled'

function Footer() {
  return (
    <Container>
      <ul className="social_list">
        <li>
          <FaFacebook />
        </li>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaLinkedin />
        </li>
      </ul>
      <p className="copy_right">
        <span>Tecnologia da Informação </span>&copy;2022
      </p>
    </Container>
  )
}

export default Footer
