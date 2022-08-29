import { parse, v4 as uuidv4 } from 'uuid'

import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './Project.module.css'
import './Project.module.css'
//resgatar algo do db via algum parametro
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'
import Message from '../layout/Message'
import Material from './Material'

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
  const [removematerial, setRemoveMaterial] = useState('')
  // const [addMaterial, setAddMaterial] = useState({})

  //chamar o projeto, monitorando id do projeto, o id entre [] está sendo monitorado(no geral resgata o projeto do banco baseado no parametro da url)
  //o setTimeout simula o carregamento enquanto o projeto não vem
  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        //o then pega a resposta e tranforma em jsom, depois pega o dato para ultilizar para alagum fim
        .then(resp => resp.json())
        .then(data => {
          setProject(data)
          setServices(data.services)
          setMaterial(data.material.materiais)
        })
        .catch(err => console.log(err))
    }, 300)
  }, [id])

  // função para poder chamar toda a atualização feita em algum projeto apos a edição
  // o metodo PACTH - faz a alteração , atualiza somente o que foi mudado no banco
  // headers faz a comunicação com a Api
  // body envia os dados
  // o then tras alguma resposta, pega os dados em jsom e passa para data, com os dados ja atualizados, depois esconde o formulario e exibe uma mensagem de confimação
  function editPost(project) {
    setMessage('')
    //budget validação
    if (project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto!!')
      setType('error')
      return false
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(data)
        setShowProjectForm(false)
        setMessage('Projeto atualizado com sucesso!!')
        setType('success')
      })
      .catch(err => console.log(err))
  }

  //projeto manipulado depois do serviceForm(update no projeto adicionando serviços)
  function createService(project) {
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
    //body, envia os dados a serem atualizados
    //then os dados são retornados, a resposta e tranformada em jsom e tem acesso aos dados
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(data => {
        setShowServiceForm(false)
      })
      .catch(err => console.log(err))
  }

  //criando atualização no front do serviço apaos remover algum serviço
  // removendo o custo do serviço do custo do projeto
  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      service => service.id !== id
    )
    const projectUpdated = project

    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectUpdated)
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessage('Serviço removido com sucesso')
        setMessage('')
      })
      .catch(err => console.log(err))
  }

  //função para remover um item da lista de materiais pelo id do material
  function removeMaterial(id) {
    //pegar o id que é diferente do id material
    const filterMaterial = material.filter(material => material.id !== id)
    //acessar as propriedades do projetoUpdate
    const projectUpdated = project
    projectUpdated.material.materiais = filterMaterial

    //chamada da api
    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectUpdated)
    })
      .then(resp => resp.json)
      .then(result => {
        setProject(projectUpdated)
        setMaterial(filterMaterial)

        // toast.success('Removido com sucesso', { theme: 'colored' })
        //mensagem de remoçao de projeto apos a requisição está finalizada
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
        <div className={styles.project_details}>
          <Container customClass="column">
            {/* se tiver algo no setMessage, vou exibir a msg, o tipo e mandar a mensagem */}
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              {/* o button vai imprimir o formulario de edição ou dados do projeto, se tiver fotrmulario sendo exibido mostro editar projeto, se não mostro fechar */}
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>

              {/* se aparecer editar exibo uma coisa e se não exibir  */}
              {!showProjectForm ? (
                <div className={styles.project_info}>
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

                    <table className={styles.tableMaterial}>
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
                                className={styles.buttonRemoveMaterial}
                                onClick={() => {
                                  openAlert(idMaterial)
                                }}
                              >
                                <span className={styles.iconRemove}>
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
                  />
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handlerSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            {/* Adicionar Serviços */}

            <div className={styles.servirce_form_container}>
              <h2>Adicione um serviço</h2>
              {/* vai mostrar o formulario ou não mostrar nada */}
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar' : 'Fechar'}
              </button>
              <div className={styles.project_info}>
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
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
export default Project
