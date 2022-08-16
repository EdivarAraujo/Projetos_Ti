import styles from './Home.module.css'
import projeto from '../../img/projeto.png'
import LinkButton from '../layout/LinkButton'

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem vindo aos <span>Projetos Ti</span>
      </h1>
      <p>Começe a navegar agora mesmo.</p>
      <LinkButton to="/novoconteudo" text="Novo Projeto" />
      <img style={{ width: 1000 }} src={projeto} alt="Projetos" />
    </section>
  )
}

export default Home
