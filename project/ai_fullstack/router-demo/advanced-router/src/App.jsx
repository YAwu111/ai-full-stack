import{
  BrowserRouter,
  HashRouter,
  Link,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

export default function App(){
  return(
    <HashRouter>
      <nav>
        <ul>
          <li><Link to="#/">Home</Link></li>
          <li><Link to="#/about">About</Link></li>
        </ul>
      </nav>
      <Routes path="/" element={<Home />}></Routes>
      <Routes path="/about" element={<About />}></Routes>
    </HashRouter>
  )
}