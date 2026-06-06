import{
    Link,
    useLocation
} from 'react-router-dom';
function Navigation(){
  const isActive = to=>{
    const location = useLocation();
    if(to === location.pathname) return 'active';
    return undefined;
  }
    return(
    <nav>
        <ul>
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about')}>About</Link></li>
          <li><Link to="/user/123" className={isActive('/user/123')}>User 123</Link></li>
          <li><Link to="/products/new" className={isActive('/products/new')}>Product New</Link></li>
          <li><Link to="/products/123" className={isActive('/products/123')}>Product Detail</Link></li>
        </ul>
      </nav>
    )
}
export default Navigation;
