import styles from './Material.module.css'
import { useState, useEffect } from 'react'

function Material() {
  const [material, setMaterial] = useState('')
  const [qtd, setQtd] = useState('')
  const [valor, setValor] = useState('')

  function inserirMaterial(e) {
    console.log(setMaterial)
  }

  //tem que ser criado sempre e chamado no return para não enviar os dados para a url
  function handlerSubmit(e) {
    e.preventDefault()
  }

  return (
    <div className={styles.container_div}>
      <form className={styles.container_form} onSubmit={handlerSubmit}>
        <p>Inserir Material </p>
        <input
          className={styles.container_mat}
          type="text"
          name="material"
          placeholder="Inserir Material"
          onChange={e => setMaterial(e.target.value)}
        ></input>
        <input
          className={styles.container_qtd}
          type="number"
          name="qtd"
          placeholder="QTD"
          onChange={e => setQtd(e.target.value)}
        ></input>
        <input
          className={styles.container_vlr}
          type="number"
          name="valor"
          placeholder="Valor"
          onChange={e => setValor(e.target.value)}
        ></input>
        <button onClick={inserirMaterial} value="submit" onSubmit={setMaterial}>
          Enviar
        </button>
      </form>
    </div>
  )
}

export default Material
