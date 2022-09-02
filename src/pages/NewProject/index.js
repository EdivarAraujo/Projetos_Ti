import { useNavigate } from 'react-router-dom'
import ProjectForm from '../../components/Project/ProjectForm'
import { Container } from './styled'

function NewProject() {
  const history = useNavigate()

  function createPost(project) {
    //iniciar projeto e serviços
    project.cost = 0
    project.services = []
    project.material.materiais = []

    //adicionar os dados no banco de dados atraves do metodo post
    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //mandando os dados para o servidor
      body: JSON.stringify(project)
    })
      //confimação que deu certo(recebe uma resposta dos dados que foram chamados )
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        //redirecionamento
        history.push('/project', { message: 'Projeto criado com sucesso!' })
      })
      //caso de algum erro
      .catch(err => console.log(err))
  }

  return (
    <Container>
      <h1>Novo Projeto</h1>
      <ProjectForm handlerSubmit={createPost} btnText="Adicionar Projeto" />
    </Container>
  )
}

export default NewProject
