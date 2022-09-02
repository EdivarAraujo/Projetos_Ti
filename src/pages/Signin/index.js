import React, { useState } from 'react'
import Input from '../../components/Input/index'
import Button from '../../components/Button/index'
import * as C from './styles'

import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Signin = () => {
  const { signin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  //verifica se email e senha estãom preenchids se não vai setar para prencher os campos
  const handleLogin = async () => {
    if (!email | !senha) {
      setError('Preencha todos os campos')
      return
    }
    // ja se estiver tudo preenchido verifica se email e senhas estão corretos , se tiver algum problema pra no erro, se não vai para a home
    const res = await signin(email, senha)

    if (res) {
      setError(res)
      return
    }
    navigate('/home')
  }

  return (
    <C.Backgroud>
      <C.Container>
        <C.Layout>
          <C.LogoProjeto></C.LogoProjeto>
          <C.Campos>
            <C.Titulo>
              Projetos <p>TI</p>
            </C.Titulo>
            <C.Content>
              <C.Label>Bem vindo</C.Label>
              <Input
                type="email"
                placeholder="Digite seu E-mail"
                value={email}
                onChange={e => [setEmail(e.target.value), setError('')]}
              />
              <Input
                type="password"
                placeholder="Digite sua Senha"
                value={senha}
                onChange={e => [setSenha(e.target.value), setError('')]}
              />
              <C.LabelError>{error}</C.LabelError>
              <Button Text="Entrar" onClick={handleLogin} />
              <C.LabelSignup>
                Não tem uma conta?
                <C.Strong>
                  <Link to="/signup">&nbsp;Registre-se</Link>
                </C.Strong>
              </C.LabelSignup>
            </C.Content>
          </C.Campos>
        </C.Layout>
      </C.Container>
    </C.Backgroud>
  )
}

export default Signin
