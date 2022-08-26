import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'
//BsPencil para editar, BsFillTrashFill é a lixeira para deletar
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCard({ id, name, budget, category, handleRemove }) {
  //realiza algo  no evento
  const remove = e => {
    e.preventDefault()
    handleRemove(id)
  }
  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R$ {budget}
      </p>
      <p className={styles.category_text}>
        {/* acessa a categoria pelos estilos, as bolinas mudam de cor de acordo com acategoria do projeto*/}
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>
      <div className={styles.project_card_actions}>
        {/* esse link vai virar uma tela de edição */}

        <Link to={`/projectId/${id}`}>
          <BsPencil />
          Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
