import styles from './Material.module.css'
import { useState, useEffect } from 'react'

function Material({ setAddMaterial, submit }) {
  const [material, setMaterial] = useState('')
  const [qtd, setQtd] = useState('')
  const [valor, setValor] = useState('')

  function inserirMaterial(e) {
    if (material != '' && qtd != '' && valor != '') {
      setMaterial(material)
      setQtd(qtd)
      setValor(valor)
      submit(1)
      setAddMaterial({ material, qtd, valor })
    } else {
      alert('material invalido')
    }
  }

  //tem que será criado sempre e chamado no return para não enviar os dados para a url
  function handlerSubmit(e) {
    e.preventDefault()
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
        <button onClick={inserirMaterial} type="submit">
          Enviar
        </button>
      </form>
    </div>
  )
}

export default Material
