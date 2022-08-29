import { Link } from 'react-router-dom'
import { Container } from './styled'

function LinkButton({ to, text }) {
  return (
    <Container>
      <Link className="btn" to={to}>
        {text}
      </Link>
    </Container>
  )
}

export default LinkButton
