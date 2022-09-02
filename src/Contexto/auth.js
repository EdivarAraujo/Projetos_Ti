import { createContext, useEffect, useState } from 'react'
import api from '../Service/api'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const navigate = useNavigate()

  //função de signin - recebeno um email e senha, verifica se é o mesmo email, e senha , gerando um token para poder ter um controle, setando no localStorage com o userToken, pasando como stringfi o email e o token

  const signin = async (email, password) => {
    //recebe os usuarios do bancos
    const { data: usersStorage } = await api.get('usuarios')

    //faz um filto se ja existe algum email cadastrado com o que está esta entrando
    const hasUser = usersStorage?.filter(user => user.email === email)

    //se tiver usuario
    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2)
        localStorage.setItem('user_tokens', JSON.stringify({ email, token }))
        //seta para o user o email e senha
        setUser({ email, password })
        return
      } else {
        return 'E-mail ou senha incorretos'
      }
    } else {
      return 'Usuario não cadastrado'
    }
  }

  //função de cadastrar usuario

  //verifica se tem um emnail como que esta tentando cadastrar,
  //caso tenha usario cadastrado vai retonar para o usuario que ja tem uma conta com esse email

  const signup = async (email, password) => {
    console.log(email, password, 'email e senha')
    // const usersStorage = JSON.parse(localStorage.getItem('users_db'))
    try {
      const attrs = { email, password }

      const Cadastro = await api.post('/usuarios', attrs)
      toast.success('Usuário cadastrado')

      navigate('/')
      return Cadastro
    } catch (error) {
      // console.log(error.menssage)
      return error.menssage
    }
  }

  const signout = () => {
    setUser(null)
    localStorage.removeItem('user_token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth: !!window.localStorage.getItem('user_tokens'),
        signed: !!user,
        signin,
        signup,
        signout
      }}
    >
      {children}
      <ToastContainer
        // position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
    </AuthContext.Provider>
  )
}
