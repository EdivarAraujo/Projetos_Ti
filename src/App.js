import RoutesApp from './Routes'
import { AuthProvider } from './Contexto/auth'
function App() {
  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  )
}
export default App
