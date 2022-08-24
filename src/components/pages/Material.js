import styles from './Material.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Material({ projectData, dataMaterial, setAddMaterial, submit }) {
  const { id: idCurrentProject } = useParams()
  const [material, setMaterial] = useState('')
  const [qtd, setQtd] = useState('')
  const [valor, setValor] = useState('')

  async function inserirMaterial(e) {
    // Gerando novo id para o novo material inserido
    const getLastId = dataMaterial[dataMaterial.length - 1]?.id + 1 || 1

    // Montando a estrutura do novo material a ser inserido
    const objMaterial = {
      id: projectData?.material?.id,
      name: projectData?.material?.name,
      materiais: [
        ...dataMaterial,
        {
          id: getLastId,
          material,
          qtd,
          valor
        }
      ]
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

    if (material && qtd && valor) {
      // Atualiza o projeto com o novo material
      await axios
        .put(`http://localhost:5000/projects/${idCurrentProject}`, objUpdate)
        .then(res => {
          // Atualizando o state com o novo material
          setAddMaterial(oldData => [
            ...oldData,
            { id: getLastId, material, qtd, valor }
          ])
        })
        .catch(err => console.error(err.message))
      setMaterial('')
      setQtd('')
      setValor('')
    } else {
      alert('material invalido')
    }
  }

  //tem que será criado sempre e chamado no return para não enviar os dados para a url
  function handlerSubmit(e) {
    e.preventDefault()
    inserirMaterial()
  }

  return (
    <div className={styles.container_div}>
      <form className={styles.container_form} onSubmit={handlerSubmit}>
        <p>Inserir Material :</p>
        <input
          className={styles.container_mat}
          type="text"
          name="material"
          placeholder="Inserir Material"
          onChange={e => setMaterial(e.target.value)}
          value={material}
        ></input>
        <input
          className={styles.container_qtd}
          type="number"
          name="qtd"
          placeholder="QTD"
          onChange={e => setQtd(e.target.value)}
          value={qtd}
        ></input>
        <input
          className={styles.container_vlr}
          type="number"
          name="valor"
          placeholder="Valor"
          onChange={e => setValor(e.target.value)}
          value={valor}
        ></input>
        <button onClick={handlerSubmit} type="submit">
          Enviar
        </button>
      </form>
    </div>
  )
}

export default Material
