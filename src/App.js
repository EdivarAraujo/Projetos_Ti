import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Colaboradores from './components/pages/Colaboradores'
import Sector from './components/pages/Sector'
import NewProject from './components/pages/NewProject'
import Projects from './components/pages/Projects'
import Project from './components/pages/Project'
import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Container customClass="min-height">
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/project">
            <Projects />
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
      <Footer />
    </Router>
  )
}

export default App
