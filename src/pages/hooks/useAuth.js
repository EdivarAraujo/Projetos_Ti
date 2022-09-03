import { useContext } from 'react'
import { AuthContext } from '../../Contexto/auth'

//funçãon de consumir os dados do contexto, retornando o valor de todo contexo
const useAuth = () => {
  const context = useContext(AuthContext)

  // console.log('--reinaldo', context?.isAuth)

  return context
}

export default useAuth
