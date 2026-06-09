import type { Todo } from '../../types/todo'

export default function TodoList({ todos, removeTodo, toggleTodo, categoryId, expandingId }) {
    return (
        <ul className="todo-list">
            {
                todos.map((todo: Todo) => (
                    todo.categoryId === categoryId &&
                    <li 
                        key={todo.id} 
                        className={`todo-item ${expandingId === todo.id ? 'expanding' : ''}`}
                    >
                        <label className="todo-checkbox">
                            <input 
                                type="checkbox" 
                                checked={todo.completed} 
                                onChange={() => toggleTodo(todo.id)} 
                            />
                            <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                                {todo.title}
                            </span>
                        </label>
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={() => removeTodo(todo.id)}
                        >
                            删除
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}