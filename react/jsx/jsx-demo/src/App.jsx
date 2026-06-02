// 根组件
// jsx 
// 组件树
// ？ 函数  将JSX + 逻辑封装成了一个组件
// 组件是由js/css/html 组合起来，完成一个相对独立的功能
// JSX 负责UI
// use 使用
// state 数据状态 ~ ref 
import { useState } from 'react';
import './App.css'

function App(){
  // 组件的数据业务，交互等
  // const name = "vue";
  // useState 会返回一个数组，数组中第一个元素是当前的状态值，第二个元素是设置状态值的函数
  const [name,setName] = useState('vue');
  const [list,setList] = useState([
    {
      id:1,
      title:'学习react',
      done:false
    },
    {
      id:2,
      title:'学习vue',
      done:false
    },
    {
      id:3,
      title:'学习js',
      done:false
    }
  ])
  const [isLogin,setIsLogin] = useState(false);
  const element = <h2>JSX 是 React 中用于描述用户界面的语法扩展</h2>
  setTimeout(()=>{
    setName('react');
  },1000)
  const toggleLogin = ()=>{
    setIsLogin(!isLogin);
  }
  // JSX 是来自js的 class 是js的关键字 不能用，所以用className代替
  return (
    // <> 文档碎片标签
    <div>
      {element}
      <h3>Hello <span className="title">{name}!</span></h3>
        {
        list.length > 0 ? (
          <ul>
            { // 原生JS react 能不用新语法，就不用
              // xml in js 
              list.map((item) => (
                <li key={item.id}>
                  {item.title}
                </li>
              ))
            }
          </ul>
        ): (<div>暂无待办事项</div>)
      }
      {isLogin ? <div>已登录</div> : <div>未登录</div>}
      <button onClick={toggleLogin}>
        {isLogin ? '退出登入': '登入'}
      </button>
    </div>
  )
}
export default App;