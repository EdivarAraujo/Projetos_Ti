import { parse, v4 as uuidv4 } from 'uuid'

import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//resgatar algo do db via algum parametro
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../../components/Layout/Loading'
import Container from '../../components/Layout/Container'
import ProjectForm from '../../components/Project/ProjectForm'
import ServiceForm from '../../components/Service/ServiceForm'
import ServiceCard from '../../components/Service/ServiceCard'
import Message from '../../components/Layout/Message'
import Material from '../Material/index'
import api from '../../Service/api'

import { ContainerStyled } from './styled'

function Project() {
  //Resgatar os dados do banco para poder fazer edição dos dados, pegando o id pela url
  //pagando id via url
  const { id } = useParams()
  const [project, setProject] = useState([])
  const [services, setServices] = useState([])
  //state para exibir o formulario do projeto
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()
  const [material, setMaterial] = useState()
  const [reload, setReload] = useState(false)

  useEffect(() => {
    getProjetos()
  }, [reload])
  //chamar o projeto, monitorando id do projeto, o id entre [] está sendo monitorado(no geral resgata o projeto do banco baseado no parametro da url)
  async function getProjetos() {
    await api
      .get(`/projects/${id}`)
      .then(({ data }) => {
        setProject(data)
        setServices(data.services)
        setMaterial(data.material.materiais)
      })
      .catch(err => {
        console.error(err)
      })
  }

  // função para poder chamar toda a atualização feita em algum projeto apos a edição
  // o metodo PACTH - faz a alteração , atualiza somente o que foi mudado no banco
  // o then tras alguma resposta, pega os dados em jsom e passa para data, com os dados ja atualizados, depois esconde o formulario e exibe uma mensagem de confimação
  async function editPost(project) {
    setMessage('')
    if (project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto!!')
      setType('error')
      return false
    }
    await api
      .patch(`/projects/${project.id}`, project)
      .then(({ data }) => {
        console.log(data)
        setProject(data)

        setShowProjectForm(false)
        setMessage('Projeto atualizado com sucesso!!')
        setType('success')
      })
      .catch(err => {
        console.error(err)
      })
  }

  //projeto manipulado depois do serviceForm(update no projeto adicionando serviços)
  async function createService(project) {
    setMessage('')
    //pegar ultimo serviço
    const lastService = project.services[project.services.length - 1]
    lastService.id = uuidv4()

    //pega o custo do ultimo serviço
    const lastServiceCost = lastService.cost
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    //caso passe do valor maximo do projeto, se o valor novo for maior que o custo do projet
    if (newCost > parseFloat(project.budget)) {
      setMessage('Orçamento Ultrapassado, verifique o valor do serviço')
      setType('error')
      project.services.pop()
      return false
    }

    //adicionar o serviço de custo ao projeto total
    project.cost = newCost

    //atualizar projeto
    //Patch, atualiza dados parciais do projeto
    //then os dados são retornados, a resposta e tranformada em jsom e tem acesso aos dados
    await api
      .patch(`/projects/${project.id}`)
      .then(({ data }) => {
        setShowServiceForm(false)
      })
      .catch(err => {
        console.error(err)
      })
  }

  //criando atualização no front do serviço apaos remover algum serviço
  // removendo o custo do serviço do custo do projeto
  async function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      service => service.id !== id
    )
    const projectUpdated = project

    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    await api
      .patch(`/projects/${projectUpdated.id}`)
      .then(({ data }) => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessage('Serviço removido com sucesso')
        setMessage('')
      })
      .catch(err => {
        console.error(err)
      })
  }

  //função para remover um item da lista de materiais pelo id do material
  //pegar o id que é diferente do id material
  //acessar as propriedades do projetoUpdate
  async function removeMaterial(id) {
    const filterMaterial = material.filter(material => material.id !== id)
    const projectUpdated = project
    projectUpdated.material.materiais = filterMaterial

    //chamada da api
    await api
      .patch(`/projects/${projectUpdated.id}`)
      .then(({ data }) => {
        setProject(projectUpdated)
        setMaterial(filterMaterial)
      })
      .catch(err => {
        console.error(err)
      })
  }
  function openAlert(id) {
    Swal.fire({
      title: 'Remover este item?',
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonText: `Cancelar`
    }).then(result => {
      if (result.isConfirmed) {
        removeMaterial(id)
        Swal.fire('Salvo!', '', 'success')
      }
    })
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  return (
    <>
      {/* Se tiver algum projeto, exibo os que tiver, se não exibe o loading */}
      {project.name ? (
        <ContainerStyled>
          <Container customClass="column">
            {/* se tiver algo no setMessage, vou exibir a msg, o tipo e mandar a mensagem */}
            {message && <Message type={type} msg={message} />}
            <div className="form_container">
              <h1>Projeto: {project.name}</h1>
              {/* o button vai imprimir o formulario de edição ou dados do projeto, se tiver fotrmulario sendo exibido mostro editar projeto, se não mostro fechar */}
              <button className="btn" onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>

              {/* se aparecer editar exibo uma coisa e se não exibir  */}
              {!showProjectForm ? (
                <div className="project_info">
                  <p>
                    <span>Setor: </span>
                    {project.setores.name}
                  </p>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de orçamento:</span> R$ {project.budget}
                  </p>
                  <p>
                    <span>Total de valor utilizado:</span> R$ {project.cost}
                  </p>
                  <p>
                    <span>Tipo de Material ultilizado: </span>
                    {project.material.name}
                  </p>
                  <p>
                    <span>Material ultilizado: </span>

                    <table className="tableMaterial">
                      <tr>
                        <th>Material</th>
                        <th>Quantidade</th>
                        <th>U.Medida</th>
                        <th>Valor R$</th>
                        <th>Remover</th>
                      </tr>
                      {material?.map(item => {
                        const idMaterial = item.id
                        return (
                          <tr>
                            <td>{item?.material}</td>
                            <td>{item?.qtd}</td>
                            <td>{item?.medida?.name}</td>
                            <td>{item?.valor}</td>
                            <td>
                              <button
                                className="buttonRemoveMaterial"
                                onClick={() => {
                                  openAlert(idMaterial)
                                }}
                              >
                                <span>
                                  <span>Remover</span>
                                </span>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </table>
                  </p>
                  <Material
                    projectData={project}
                    dataMaterial={material}
                    setAddMaterial={setMaterial}
                    setReload={setReload}
                    reload={reload}
                  />
                </div>
              ) : (
                <div className="project_info">
                  <ProjectForm
                    handlerSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            {/* Adicionar Serviços */}

            <div className="form_container">
              <h2>Adicione um serviço</h2>
              {/* vai mostrar o formulario ou não mostrar nada */}
              <button className="btn" onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar' : 'Fechar'}
              </button>
              <div className="project_info">
                {/* se o showServiceForm tiver habilitado vamos qurer exibir o formulario */}
                {showServiceForm && (
                  <ServiceForm
                    handlerSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map(service => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Sem serviços cadastrados</p>}
            </Container>
          </Container>
        </ContainerStyled>
      ) : (
        <Loading />
      )}
    </>
  )
}
export default Project
