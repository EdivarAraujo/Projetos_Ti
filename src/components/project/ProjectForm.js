import { useEffect, useState } from 'react'
import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjectForm({ handlerSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([])
  //pega do formulario de edição, vai preencher o state, se não é vasio e preencha na ,mão nos input
  const [project, setProject] = useState(projectData || {})

  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        setCategories(data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])
  //
  const submit = e => {
    e.preventDefault()
    // console.log(project)
    handlerSubmit(project)
  }

  function handlerChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  function handlerCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }
    })
  }

  return (
    <div>
      <form onSubmit={submit} className={styles.form}>
        <Input
          type="text"
          text="Nome do Projeto"
          name="name"
          placeholder="Nome do Projeto"
          handlerOnChange={handlerChange}
          vale={project.name ? project.name : ''}
        />
        <Input
          type="number"
          text="Orçamento do projeto"
          name="budget"
          placeholder="Insira o orçamento total"
          handlerOnChange={handlerChange}
          value={project.budget ? project.budget : ''}
        />
        <Select
          name="category_id"
          text="Selecionar a categoria"
          options={categories}
          handlerOnChange={handlerCategory}
          value={project.category ? project.category.id : ''}
        />
        <SubmitButton text={btnText} />
      </form>
    </div>
  )
}

export default ProjectForm
