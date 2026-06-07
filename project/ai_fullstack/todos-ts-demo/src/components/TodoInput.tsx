import { useState } from "react";

interface Props {
    onAdd:(title:string)=>void,
}

export default function TodoInput({onAdd}:Props){
    const [title,setTitle] = useState('');
    return(
        <div>
            <input type="text" placeholder="请输入内容" value={title} onChange={e=>setTitle(e.target.value)} />
            <button type="button" onClick={()=>{
                onAdd(title);
                setTitle('');
            }}>添加</button>
        </div>
    )
}