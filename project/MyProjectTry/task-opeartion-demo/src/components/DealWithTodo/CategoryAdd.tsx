import { useState } from "react";

export default function CategoryAdd({ categoryAdd }) {
    const [value, setValue] = useState('');
    const handleAdd = (value: string) => {
        categoryAdd(value);
    }
    return (
        <div className="category-add">
            <h3>添加分类</h3>
            <div className="add-form">
                <input 
                    type="text" 
                    value={value} 
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    placeholder="输入分类名称..."
                />
                <button type="button" className="btn btn-primary" onClick={() => {
                    if (!value.trim()) return;
                    handleAdd(value);
                    setValue('');
                }}>添加</button>
            </div>
        </div>
    )
}