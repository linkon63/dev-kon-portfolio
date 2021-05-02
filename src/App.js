import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderNav from './components/Shared/HeaderNav/HeaderNav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Projects from './components/Projects/Projects';
import 'fontsource-roboto';
import Cv from './components/Resume/Cv/Cv';
import Blog from './components/Blog/Blog';
import About from './components/About/About';
function App() {
  return (
    <div>
      
      <Router>
      <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/projects">
            <Projects></Projects>
          </Route>
          <Route path="/resume">
            <Cv></Cv>
          </Route>
          <Route path="/blog">
            <Blog></Blog>
          </Route>
          <Route path="/about">
            <About></About>
          </Route>
          <Route path="/">
          <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
