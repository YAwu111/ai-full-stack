import type { Todo } from "../types/todo"

interface Props {
    todos: Todo[],
    onToggle: (id: number) => void,
    onRemove: (id: number) => void,
}

export default function TodoList({ todos, onToggle, onRemove }: Props) {
    return (
        <ul>
            {
                todos.map((todo: Todo) => {
                    return (
                        <li key={todo.id} style={{
                            listStyleType: 'none'
                        }}>
                            <button type="button" onClick={() => onToggle(todo.id)}>{todo.completed ? '√' : 'X'}</button>
                            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
                            <button type="button" onClick={() => onRemove(todo.id)}>删除</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}