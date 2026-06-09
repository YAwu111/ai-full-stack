import { useMemo } from 'react';
import useTodosStore from '../store/Todos';

export default function Statistics() {
  const todos = useTodosStore((state) => state.todos);
  
  const stats = useMemo(() => {
    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;
    const completionRate = totalCount > 0 ? ((completedCount / totalCount) * 100).toFixed(1) : '0';
    const rand = Math.floor(Math.random() * 5);
    
    const sayings = [
      '每一个完成的任务，都是向梦想迈进的一步！💪',
      '今日事，今日毕。你的努力终将成就更好的自己！🌟',
      '任务就像积木，一块一块搭建起你的成功大厦！🧱',
      '坚持就是胜利，每一次完成都是对自己的肯定！🎯',
      '行动是治愈恐惧的良药，完成任务让你更自信！✨'
    ];
    
    return { completedCount, totalCount, completionRate, saying: sayings[rand] };
  }, [todos]);

  return (
    <div className="stats-page">
      <div className="stats-container">
        <div className="stats-header">
          <h2>📊 任务统计</h2>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-value">{stats.completedCount}</div>
              <div className="stat-label">已完成任务</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <div className="stat-value">{stats.totalCount}</div>
              <div className="stat-label">总任务数</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <div className="stat-value">{stats.completionRate}%</div>
              <div className="stat-label">完成率</div>
            </div>
          </div>
        </div>
        
        <div className="completion-bar">
          <div className="completion-label">任务完成进度</div>
          <div className="completion-track">
            <div 
              className="completion-fill" 
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
          <div className="completion-text">{stats.completedCount} / {stats.totalCount}</div>
        </div>
        
        <div className="inspiration-box">
          <h3>💡 今日寄语</h3>
          <p>{stats.saying}</p>
        </div>
      </div>
    </div>
  )
}