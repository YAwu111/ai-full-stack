import {
    useState
} from 'react';
import type { Todo } from '../types/todo';
import { getStorage,setStorage } from '../utils/storages';

const STORAGE_KEY = 'todos';

export function useTodos(){
    const [todos,setTodos] = useState<Todo[]>(()=>getStorage<Todo[]>(STORAGE_KEY,[]));
    const addTodo = (title:string) =>{
        const newTodo:Todo = {
            id:+new Date(),
            title,
            completed:false
        }
        const newTodos = [...todos,newTodo];
        setTodos(newTodos);
        setStorage<Todo[]>(STORAGE_KEY,newTodos);
    }
    const toggleTodo = (id:number) =>{
        const todo = todos.find(todo => todo.id === id);
        if(todo) todo.completed = !todo.completed;
        setTodos([...todos]);
        setStorage<Todo[]>(STORAGE_KEY,todos);
    }

    const removeTodo = (id:number)=>{
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        setStorage<Todo[]>(STORAGE_KEY,newTodos);
    }
    return (
        {todos,
        addTodo,
        toggleTodo,
        removeTodo}
    )
}