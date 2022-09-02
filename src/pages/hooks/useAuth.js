import { useContext } from 'react'
import { AuthContext } from '../../Contexto/auth'

const useAuth = () => {
  const context = useContext(AuthContext)

  console.log('--reinaldo', context?.isAuth)

  return context
}

export default useAuth
