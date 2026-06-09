import { useState } from "react";
import TodoList from "./TodoList";
import useTodosStore from '../../store/Todos'
import useCategoriesStore from '../../store/Categories'
import TodoAdd from "./TodoAdd";

export default function TodoCategory({ category, isNew }) {
    const [show, setShow] = useState(false);
    const [expandingId, setExpandingId] = useState<number | null>(null);
    const {
        todos,
        addTodo,
        removeTodo,
        toggleTodo,
        removeTodosByCategory
    } = useTodosStore();
    const { removeCategory } = useCategoriesStore();
    const handleAdd = (title: string, categoryId: number) => {
        const newTodo = {
            id: Date.now(),
            title,
            categoryId,
            completed: false
        };
        setExpandingId(newTodo.id);
        addTodo(title, categoryId);
        setTimeout(() => setExpandingId(null), 500);
    };

    const handleDelete = () => {
        removeTodosByCategory(category.id);
        removeCategory(category.id);
    };

    return (
        <div className={`todo-category ${isNew ? 'new-category' : ''}`}>
            <div className="category-header">
                <span className="category-name">{category.name}</span>
                <div className="category-actions">
                    <button 
                        type="button" 
                        className="btn"
                        onClick={() => setShow(!show)}
                    >
                        {show ? '隐藏' : '显示'}
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={handleDelete}
                    >
                        删除
                    </button>
                </div>
            </div>
            {show && (
                <div className="category-content">
                    <TodoAdd TitleAdd={handleAdd} categoryId={category.id} />
                    <TodoList 
                        todos={todos} 
                        removeTodo={removeTodo} 
                        toggleTodo={toggleTodo} 
                        categoryId={category.id}
                        expandingId={expandingId}
                    />
                </div>
            )}
        </div>
    )
}