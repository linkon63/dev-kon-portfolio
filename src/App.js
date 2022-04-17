import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Projects from './components/Projects/Projects';
import Cv from './components/Resume/Cv/Cv';
import Blog from './components/Blog/Blog';
import About from './components/About/About';


function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/resume">
            <Cv />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
  );
};

export default App;
