import { ToastContainer, toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Select from '../../components/Form/Select'
import { Container } from './styled'

function Material({
  projectData,
  dataMaterial,
  setAddMaterial,
  setReload,
  reload
}) {
  const { id: idCurrentProject } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [material, setMaterial] = useState('')
  const [qtd, setQtd] = useState([])
  const [valor, setValor] = useState([])
  const [project, setProject] = useState([])
  const [medidas, setMedidas] = useState([])
  const [medida, setMedida] = useState({})

  useEffect(() => {
    fetch('http://localhost:5000/medidas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        setMedidas(data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  //seta o tipo da categoria
  function handlerMedidas(e) {
    setMedida({
      id: Number(e.target.value),
      name:
        medidas?.find(medida => {
          return medida?.id == e.target.value
        })?.unidade || ''
    })
    return
  }

  //função para inserir material na lista
  async function inserirMaterial(e) {
    // Gerando novo id para o novo material inserido
    const getLastId =
      dataMaterial?.length > 0
        ? dataMaterial[dataMaterial?.length - 1]?.id + 1
        : 1
    const valorInt = parseInt(valor)

    // Montando a estrutura do novo material a ser inserido
    const newDataMaterial = {
      id: getLastId,
      material,
      medida: medida,
      qtd,
      valor: valorInt.toFixed(2)
    }
    //se não tiver material vai adicionar somente um, se tiver algum ele pega o antigos e adiciona junto com o novo
    const objMaterial = {
      id: projectData?.material?.id,
      name: projectData?.material?.name,
      materiais:
        dataMaterial?.length > 0
          ? [...dataMaterial, newDataMaterial]
          : [newDataMaterial]
    }

    // Remontando o obj para inserir no projeto expecifico
    const objUpdate = {
      name: projectData?.name,
      budget: projectData?.budget,
      setores: projectData?.setores,
      category: projectData?.category,
      material: objMaterial,
      cost: projectData?.cost,
      services: projectData?.services,
      id: projectData?.id
    }

    if (material && qtd && valor && medida?.id) {
      // Atualiza o projeto com o novo material
      setIsLoading(true)
      await axios
        .put(`http://localhost:5000/projects/${idCurrentProject}`, objUpdate)
        .then(res => {
          // Atualizando o state com o novo material
          const newMaterial = { id: getLastId, material, qtd, valor }
          // se tiver material vai adicionar o novo material com o material que ja está inserido, se não so mostra o novo material
          if (dataMaterial?.length > 0) {
            setAddMaterial(oldData => [...oldData, newMaterial])
          } else {
            setAddMaterial([newMaterial])
          }
        })
        .catch(err => console.error(err.message))
        .finally(() => setIsLoading(false))
      setMaterial('')
      setQtd('')
      setValor('')
      setMedida({})
      setReload(!reload)

      //menssagem de confirmação de material adiconado com sucesso
      toast.success('Adicionado com sucesso')
    } else {
      //menssagem de alerta de que necessida de todos os campos prenxidos para poder adicionar o material
      toast.error('Preencha todos os campos')
    }
  }

  //tem que será criado sempre e chamado no return para não enviar os dados para a url
  function handlerSubmit(e) {
    e.preventDefault()
    setProject({ ...project, [e.target.unidade]: e.target.value })
    inserirMaterial()
  }

  return (
    <>
      <Container>
        <form onSubmit={handlerSubmit}>
          <p>Material</p>
          <input
            className="mat"
            type="text"
            name="material"
            placeholder="Inserir Material"
            onChange={e => setMaterial(e.target.value)}
            value={material}
          ></input>
          <Select
            name="materiais"
            options={medidas}
            handlerOnChange={handlerMedidas}
            value={medida?.id || ''}
          />
          <input
            className="qtd"
            type="number"
            name="qtd"
            placeholder="QTD"
            onChange={e => setQtd(e.target.value)}
            value={qtd}
          ></input>
          <input
            className="vlr"
            type="number"
            name="valor"
            placeholder="Valor"
            onChange={e => setValor(e.target.value)}
            value={valor}
          ></input>

          <button onClick={handlerSubmit} type="submit" disabled={isLoading}>
            Enviar
          </button>
        </form>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default Material
