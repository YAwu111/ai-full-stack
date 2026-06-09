import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Todo } from '../types/todo'

export interface TodosState {
    todos: Todo[];
    addTodo: (title: string, categoryId: number) => void;
    removeTodo: (id: number) => void;
    removeTodosByCategory: (categoryId: number) => void;
    toggleTodo: (id: number) => void;
}

const useTodosStore = create<TodosState>()(
    persist(
        (set) => ({
            todos: [],
            addTodo: (title: string, categoryId: number) =>
                set((state) =>
                ({
                    todos: [...state.todos, {
                        id: Date.now(),
                        title,
                        completed: false,
                        categoryId
                    } as Todo]
                })),
            removeTodo: (id: number) =>
                set((state) => ({
                    todos: state.todos.filter(todo => todo.id !== id)
                })),
            removeTodosByCategory: (categoryId: number) =>
                set((state) => ({
                    todos: state.todos.filter(todo => todo.categoryId !== categoryId)
                })),
            toggleTodo: (id: number) =>
                set((state) => ({
                    todos: [...state.todos.map(todo => {
                        if (todo.id === id) {
                            return { ...todo, completed: !todo.completed }
                        }
                        return todo;
                    })]
                }))
        }), {
        name: 'todos'
    }
    )
)
export default useTodosStore;