import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Message from '../layout/Message'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import Loading from '../layout/Loading'
import styles from './Projects.module.css'

function Projects() {
  //state para salvar os projetos
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  //useLocation regata o valor da mensagem
  //console log -se tiver algo no location.state, ver se a mensagem existe
  const location = useLocation()
  let message = ''
  console.log(location.state, ' state location')
  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {
    //esse setTimeout é para atrasar um pouco o loading enquanto faz a requisição todos os dodos da api
    setTimeout(() => {
      //da acesso aos projetos salvos no db.json(Api)
      fetch('http://localhost:5000/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        //ao terminar de carrehar todos os projetos o loadim para de rodar
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          setProjects(data)
          setRemoveLoading(true)
        })
        .catch(err => console.error(err))
    }, 3000)
  }, [])

  //  função de excluir projeto(recebendo o id do projeto)
  //  fetch -acessa o id na rota da api
  //  1.then recebe a requisição da api e transforma em json
  //  2.then faz um filter no projeto para pode excluir pelo id
  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(resp => resp.json)
      .then(() => {
        setProjects(projects.filter(project => project.id !== id))
        //mensagem de remoçao de projeto apos a requisição está finalizada
        setProjectMessage('Projeto removido com sucesso')
      })
      .catch(err => console.log(err))
  }
  //A importação do LinkButton permite criar projeto dentro da pagina projetos

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/novoconteudo" text="Novo Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map(project => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.key}
              handleRemove={removeProject}
            />
          ))}
        {/* fica aparecendomo loadin enquanto recarrega todos os projetos na
        pagina, caso não apresente nenhum projeto vai apresentar a mensagem */}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados</p>
        )}
      </Container>
    </div>
  )
}

export default Projects
