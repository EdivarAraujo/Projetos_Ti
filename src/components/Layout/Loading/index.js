import loading from '../../../img/loading.svg'
import { Container } from './styled'

function Loading() {
  return (
    <Container>
      <img className="loader" src={loading} alt="Loading" />
    </Container>
  )
}

export default Loading
