import {
    useEffect
} from 'react';
import {
  useNavigate
} from 'react-router-dom';

const NotFound = () =>{
    // Link 点击跳转
    let navigate = useNavigate();
    useEffect(() =>{
        setTimeout(() =>{
            navigate('/')
        },6000)
    },[])
    return(
        <>
            <h1>404 Not Found</h1>
        </>
    )
}
export default NotFound