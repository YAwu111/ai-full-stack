import{
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from 'react-router-dom';
import { 
  lazy,
  Suspense
 } from 'react';
// import Home from './pages/Home.jsx';
// import About from './pages/About.jsx';
import LoadingFallback from '../components/LoadingFallback'

const Home = lazy(() => import('../pages/Home.jsx'))
const About = lazy(() => import('../pages/About.jsx'))
const UserProfile = lazy(() => import('../pages/UserProfile.jsx'))
const Product = lazy(()=>import('../pages/product/index.jsx'))
const ProductDetail = lazy(()=>import('../pages/product/ProductDetail.jsx'))
const NewProduct = lazy(()=>import('../pages/product/NewProduct.jsx'))
const Login = lazy(()=>import('../pages/Login.jsx'))
const ProtectRoute = lazy(()=>import('../components/ProtectRoute.jsx'))
const Pay = lazy(()=>import('../pages/Pay'))
const NotFound = lazy(() => import('../pages/NotFound.jsx'))
const NewPath = lazy(()=>import('../pages/NewPath'))

function RouterConfig(){
    return(
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                {/* 动态路由 http（s）://www.juejin.cn/suer/12345?keyword=23#/about
          // 协议: // domain/paht/:params?queryString
          // */}
                <Route path="/user/:id" element={<UserProfile />}></Route>
                <Route path="/products" element={<Product />}>
                    <Route path=":productId" element={<ProductDetail />} />
                    <Route path="new" element={<NewProduct />} />
                </Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/old-path" element={<Navigate to="/new-path" />}></Route>
                <Route path="/new-path" element={<NewPath />}></Route>
                {/* 鉴权路由 */}
                <Route path="/path" element={
                    <ProtectRoute>
                        <Pay />
                    </ProtectRoute>
                }>
                </Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </Suspense>
    )
}

export default RouterConfig;