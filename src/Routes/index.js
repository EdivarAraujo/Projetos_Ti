import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'
import Signin from '../pages/Signin/index'
import Colaboradores from '../pages/Colaboradores/index'
import Sector from '../pages/Sector'
import NewProject from '../pages/NewProject'
import MeusProjetos from '../pages/MeusProjetos/index'
import Project from '../pages/Project'
import Container from '../components/Layout/Container/index'
import Navbar from '../components/Layout/Navbar'
import Footer from '../components/Layout/Footer'
import useAuth from '../pages/hooks/useAuth'
import Signup from '../pages/Signup'
import Home from '../pages/Home/index'

const Private = ({ Item }) => {
  const { isAuth } = useAuth()

  return isAuth ? <AuthRoutes /> : <SignInRoutes />
}

function AuthRoutes() {
  return (
    <>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/home" element={<Home />} />
          <Route path="/project" element={<MeusProjetos />}></Route>
          <Route path="/sector" element={<Sector />}></Route>
          <Route path="/colaboradores" element={<Colaboradores />}></Route>
          <Route path="/novoconteudo" element={<NewProject />}></Route>
          <Route path="/projectId/:id" element={<Project />}></Route>
        </Switch>
      </Container>
      <Footer />
    </>
  )
}

const SignInRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/signup" element={<Signup />} />
        <Route path="*" element={<Signin />} />
      </Switch>
    </>
  )
}

const RoutesApp = () => {
  return <Private />
}
export default RoutesApp
