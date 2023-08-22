import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
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
import Resume from './components/Resume/Resume';
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
            {/* <Resume></Resume> */}
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
=======

function App() {
  return (
    <div className="App">
      <header className="App-header">
          Learn React
      </header>
>>>>>>> f26634ba75bf09efe8fc229843536a77419cad8d
    </div>
  );
}

export default App;
