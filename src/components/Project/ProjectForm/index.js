import { useEffect, useState } from 'react'
import { Container } from './styled'
import Input from '../../Form/Input'
import Select from '../../Form/Select'
import SubmitButton from '../../Form/BtnSubmit'
import api from '../../../Service/api'

function ProjectForm({ handlerSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([])
  const [material, setMaterial] = useState([])
  const [setores, setSetores] = useState([])
  //pega do formulario de edição, vai preencher o state, se não é vasio e preencha na ,mão nos input
  const [project, setProject] = useState(projectData || {})

  useEffect(() => {
    changeData()
  }, [])

  async function changeData() {
    //seta todas as opções dos tipos de materias
    await api
      .get('/material')
      .then(data => {
        setMaterial(data?.data)
      })
      .catch(err => {
        console.error(err)
      })

    //seta todas as opçõs dos tipos de categorias disponiveis
    await api
      .get('/categories')
      .then(data => {
        setCategories(data?.data)
      })
      .catch(err => {
        console.error(err)
      })

    //seta todas as opções de quais são os setores
    await api
      .get('/setores')
      .then(data => {
        setSetores(data?.data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  //tira o padrão do formulario
  const submit = e => {
    e.preventDefault()
    handlerSubmit(project)
  }

  //seta o projeto
  function handlerChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  //seta o tipo da categoria
  function handlerCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }
    })
  }
  //seta o tipo de material
  function handlerMaterial(e) {
    setProject({
      ...project,
      material: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }
    })
  }
  //seta o tipo de setores
  function handlerSetores(e) {
    setProject({
      ...project,
      setores: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }
    })
  }
  return (
    <Container>
      <form onSubmit={submit}>
        <Input
          type="text"
          text="Nome do Projeto"
          name="name"
          placeholder="Nome do Projeto"
          handlerOnChange={handlerChange}
          value={project.name ? project.name : ''}
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
          name="setores_id"
          text="Selecionar Setor"
          options={setores}
          handlerOnChange={handlerSetores}
          value={project.setores ? project.setores.id : ''}
        />
        <Select
          name="category_id"
          text="Selecionar a categoria"
          options={categories}
          handlerOnChange={handlerCategory}
          value={project.category ? project.category.id : ''}
        />
        <Select
          name="material_id"
          text="Tipo de material"
          options={material}
          handlerOnChange={handlerMaterial}
          value={project.material ? project.material.id : ''}
        />
        <SubmitButton text={btnText} />
      </form>
    </Container>
  )
}

export default ProjectForm
