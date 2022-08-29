import { Link } from 'react-router-dom'
import { Container } from './styled'
//BsPencil para editar, BsFillTrashFill é a lixeira para deletar
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCard({ id, name, budget, category, handleRemove }) {
  //realiza algo  no evento
  const remove = e => {
    e.preventDefault()
    handleRemove(id)
  }
  return (
    <Container>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R$ {budget}
      </p>
      <p className="category_text">
        {/* acessa a categoria pelos estilos, as bolinas mudam de cor de acordo com acategoria do projeto*/}
        <span className={`category_text ${category?.toLowerCase()}`}></span>
        {category}
      </p>
      <div className="project_card_actions">
        {/* esse link vai virar uma tela de edição */}

        <Link className="linkButton" to={`/projectId/${id}`}>
          <BsPencil />
          Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </Container>
  )
}

export default ProjectCard
