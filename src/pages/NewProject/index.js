import { useNavigate } from 'react-router-dom'
import ProjectForm from '../../components/Project/ProjectForm'
import { Container } from './styled'
import api from '../../Service/api'

function NewProject() {
  const history = useNavigate()

  async function createPost(project) {
    project.cost = 0
    project.services = []
    project.material.materiais = []

    await api
      .post(`/projects`, project)
      .then(() => {
        history('/project', { message: 'Projeto criado com sucesso!' })
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <Container>
      <h1>Novo Projeto</h1>
      <ProjectForm handlerSubmit={createPost} btnText="Adicionar Projeto" />
    </Container>
  )
}

export default NewProject
