import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Container } from './styled'
import React from 'react'

function Footer() {
  return (
    <Container>
      <ul className="social_list">
        <li>
          <a href="https://www.facebook.com/" target="_blank">
            <FaFacebook />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/tijucalimentos/?hl=en"
            target="_blank"
          >
            <FaInstagram />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/company/tijuca-alimentos-ltda/mycompany/"
            target="_blank"
          >
            <FaLinkedin />
          </a>
        </li>
      </ul>
      <p className="copy_right">
        <span>Tecnologia da Informação </span>&copy;2022
      </p>
    </Container>
  )
}

export default Footer
