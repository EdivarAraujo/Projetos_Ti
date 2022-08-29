import { Container } from './styled'
import projeto from '../../img/projeto.png'
import LinkButton from '../../components/Layout/LinkButton'

function Home() {
  return (
    <Container>
      <h1>
        Bem vindo aos <span>Projetos Ti</span>
      </h1>
      <p>Começe a navegar agora mesmo.</p>
      <LinkButton to="/novoconteudo" text="Novo Projeto" />
      <img src={projeto} alt="Projetos" />
    </Container>
  )
}

export default Home
