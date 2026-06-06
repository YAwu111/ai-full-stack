import{
  BrowserRouter as Router,
} from 'react-router-dom';
import Navigation from './components/Navigation.jsx'
import RouterConfig from './router/index.jsx';

export default function App(){
  return(
    <Router>
      <Navigation></Navigation>
      <RouterConfig></RouterConfig>
    </Router>
  )
}