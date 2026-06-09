import { useState, useMemo } from 'react';
import useTodosStore from '../store/Todos';
import useCategoriesStore from '../store/Categories';
import TodoList from '../components/DealWithTodo/TodoList';

export default function Search() {
  const [query, setQuery] = useState('');
  const { todos, removeTodo, toggleTodo } = useTodosStore();
  const categories = useCategoriesStore((state) => state.categories);

  const searchResults = useMemo(() => {
    if (!query.trim()) return { todos: [], categories: [] };

    const queryLower = query.toLowerCase();
    const minLength = Math.ceil(query.length / 3);

    const matchedTodos = todos.filter((todo) => {
      const titleLower = todo.title.toLowerCase();
      let matchCount = 0;
      for (let i = 0; i <= titleLower.length - queryLower.length; i++) {
        let count = 0;
        for (let j = 0; j < queryLower.length; j++) {
          if (titleLower[i + j] === queryLower[j]) {
            count++;
          }
        }
        matchCount = Math.max(matchCount, count);
      }
      return matchCount > minLength;
    });

    const matchedCategoryIds = new Set(matchedTodos.map((todo) => todo.categoryId));
    const matchedCategories = categories.filter((category) => matchedCategoryIds.has(category.id));

    return { todos: matchedTodos, categories: matchedCategories };
  }, [query, todos, categories]);

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-header">
          <h2>搜索任务</h2>
        </div>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入关键词搜索..."
            className="search-input"
          />
        </div>
        <div className="search-results">
          {query.trim() ? (
            searchResults.todos.length > 0 ? (
              <div className="results-list">
                {searchResults.categories.map((category) => (
                  <div key={category.id} className="result-category">
                    <h3 className="category-title">{category.name}</h3>
                    <TodoList
                      todos={searchResults.todos}
                      removeTodo={removeTodo}
                      toggleTodo={toggleTodo}
                      categoryId={category.id}
                      expandingId={null}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <span>📭</span>
                <p>未找到匹配的结果</p>
              </div>
            )
          ) : (
            <div className="search-hint">
              <span>💡</span>
              <p>输入关键词开始搜索</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}