import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'

import Home from './pages/Home/index'
import Colaboradores from './pages/Colaboradores/index'
import Sector from './pages/Sector'
import NewProject from './pages/NewProject'
import MeusProjetos from './pages/MeusProjetos/index'
import Project from './pages/Project'
import Container from './components/Layout/Container'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Container customClass="min-height">
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/project">
              <MeusProjetos />
            </Route>
            <Route path="/sector">
              <Sector />
            </Route>
            <Route path="/colaboradores">
              <Colaboradores />
            </Route>
            <Route path="/novoconteudo">
              <NewProject />
            </Route>
            <Route path="/projectId/:id">
              <Project />
            </Route>
          </Container>
        </Switch>
      </Router>
      <Footer />
    </>
  )
}

export default App
