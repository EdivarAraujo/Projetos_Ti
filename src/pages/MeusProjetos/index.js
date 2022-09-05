import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Message from '../../components/Layout/Message'
import Container from '../../components/Layout/Container'
import LinkButton from '../../components/Layout/LinkButton'
import ProjectCard from '../../components/Project/ProjectCard'
import Loading from '../../components/Layout/Loading'
import { ContainerStyled } from './styled'
import api from '../../Service/api'

function Projects() {
  //state para salvar os projetos
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  //useLocation resgata o valor da mensagem
  //console log -se tiver algo no location.state, ver se a mensagem existe
  const location = useLocation()
  let message = ''
  console.log(location.state, ' state location')
  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {
    buscarProjects()
  }, [])

  async function buscarProjects() {
    await api
      .get('/projects')
      .then(({ data }) => {
        setProjects(data)
        setRemoveLoading(true)
      })
      .catch(err => {
        console.error(err)
      })
  }

  //  função de excluir projeto(recebendo o id do projeto)
  //  fetch -acessa o id na rota da api
  //  1.then recebe a requisição da api e transforma em json
  //  2.then faz um filter no projeto para pode excluir pelo id
  // function removeProject(id) {
  async function removeProject(id) {
    await api
      .delete(`/projects/${id}`)
      .then(() => {
        setProjects(projects.filter(project => project.id !== id))
        setProjectMessage('Projeto removido com sucesso')
      })
      .catch(err => {
        console.error(err)
      })
  }

  //A importação do LinkButton permite criar projeto dentro da pagina projetos
  return (
    <ContainerStyled>
      <div className="title_container">
        <h1>Projetos</h1>
        <LinkButton to="/novoconteudo" text="Novo Projeto" />
      </div>
      {/* {message && <Message type="success" msg={message} />} */}
      {/* {projectMessage && <Message type="success" msg={projectMessage} />} */}
      <Container customClass="start">
        {projects?.length > 0 &&
          projects?.map(project => (
            <ProjectCard
              id={project?.id}
              name={project?.name}
              budget={project?.budget}
              category={project?.category?.name}
              key={project?.key}
              handleRemove={removeProject}
            />
          ))}
        {/* fica aparecendo o loadin enquanto recarrega todos os projetos na
        pagina, caso não apresente nenhum projeto vai apresentar a mensagem */}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados</p>
        )}
      </Container>
    </ContainerStyled>
  )
}

export default Projects
