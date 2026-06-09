import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import RouterConfig from './router';

function App() {
  return (
    <Router>
      <Navigation />
      <main className="main-content">
        <RouterConfig />
      </main>
    </Router>
  )
}

export default App