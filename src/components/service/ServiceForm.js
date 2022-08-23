import { useState, useEffect } from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

import styles from '../project/ProjectForm.module.css'

function ServiceForm({ handlerSubmit, btnText, projectData }) {
  const [service, setService] = useState({})

  //manipulo os dados do projeto adicionando um serviço e jogo o projeto todo para cima de novo
  function submit(e) {
    e.preventDefault()
    projectData.services.push(service)
    handlerSubmit(projectData)
  }

  // pego tudo que tenho do objeto e inserindo o valor para a propriedade, que está dentro do evendo, ou seja vai inserio o valor passado em e.target.nome para algum nome, o  mesmo com e.target.value (handerChange)), vai formando objeto
  function handlerChange(e) {
    setService({ ...service, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handlerOnChange={handlerChange}
      />
      <Input
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="Insira o valor total"
        handlerOnChange={handlerChange}
      />
      <Input
        type="text"
        text="Descrição do serviço"
        name="description"
        placeholder="Descreva o serviço"
        handlerOnChange={handlerChange}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ServiceForm
