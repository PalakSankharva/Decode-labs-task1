function TaskList({ tasks, deleteTask, toggleComplete }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <div className="empty-icon">🗒️</div>
          <div className="empty-text">No tasks here yet</div>
          <div className="empty-sub">Add a task above to get started</div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task, i) => (
        <div
          key={task.id}
          className={`task-item ${task.completed ? "completed-item" : ""}`}
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {/* Checkbox */}
          <div
            className={`task-check ${task.completed ? "checked" : ""}`}
            onClick={() => toggleComplete(task.id)}
            title="Toggle complete"
          >
            {task.completed && "✓"}
          </div>

          {/* Title */}
          <span className={`task-title ${task.completed ? "done" : ""}`}>
            {task.title}
          </span>

          {/* Priority badge */}
          {task.priority && (
            <span className={`priority-badge ${task.priority}`}>
              {task.priority}
            </span>
          )}

          {/* Action buttons */}
          <div className="task-actions">
            <button
              className="btn-icon btn-complete"
              onClick={() => toggleComplete(task.id)}
              title={task.completed ? "Mark pending" : "Mark complete"}
            >
              {task.completed ? "↩" : "✓"}
            </button>
            <button
              className="btn-icon btn-delete"
              onClick={() => deleteTask(task.id)}
              title="Delete task"
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;