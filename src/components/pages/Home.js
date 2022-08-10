import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem vindo aos <span>Projetos Ti</span>
      </h1>
      <p>Começe a navegar agora mesmo.</p>
      <LinkButton to="/novoconteudo" text="Novo Projeto" />
      <img src={savings} alt="Projetos" />
    </section>
  )
}

export default Home
