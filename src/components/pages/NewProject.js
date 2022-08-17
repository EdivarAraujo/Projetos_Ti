import { useHistory } from 'react-router-dom'

import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject() {
  const history = useHistory()

  function createPost(project) {
    //iniciar projeto e serviços
    project.cost = 0
    project.services = []

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
    <div className={styles.newproject_container}>
      <h1 className={styles.newproject_card}>Novo Projeto</h1>
      <ProjectForm handlerSubmit={createPost} btnText="Adicionar Projeto" />
    </div>
  )
}

export default NewProject
