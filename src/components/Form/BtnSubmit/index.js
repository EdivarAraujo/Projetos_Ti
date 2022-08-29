import { Container } from './styled'

function SubmitButton({ text }) {
  return (
    <Container>
      <button className="btn">{text}</button>
    </Container>
  )
}

export default SubmitButton
