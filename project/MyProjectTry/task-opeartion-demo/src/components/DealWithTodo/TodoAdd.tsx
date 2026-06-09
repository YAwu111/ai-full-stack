import { useState } from "react";

export default function TodoAdd({ TitleAdd, categoryId }) {
    const [value, setValue] = useState('');
    const handleAdd = (value: string) => {
        TitleAdd(value, categoryId);
    }
    return (
        <div className="todo-add">
            <input 
                type="text" 
                value={value} 
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                placeholder="添加新任务..."
            />
            <button type="button" className="btn btn-primary" onClick={() => {
                if (!value.trim()) return;
                handleAdd(value);
                setValue('');
            }}>添加</button>
        </div>
    )
}