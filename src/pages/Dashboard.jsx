function Dashboard({ tasks, pending, completed, goToTasks }) {
  const total    = tasks.length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  const highPriority = tasks.filter(
    (t) => t.priority === "high" && !t.completed
  );

  const tips = [
    { icon: "🎯", title: "Focus Mode", text: "Tackle high-priority tasks first thing in the morning." },
    { icon: "⏱", title: "Time Block",  text: "Group similar tasks to stay in flow and avoid context-switching." },
    { icon: "✅", title: "Small Wins",  text: "Break big tasks into steps — each check feels rewarding." },
  ];

  return (
    <div className="page-fade">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Here's a quick look at your progress today.</p>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon blue">📋</div>
          <div className="stat-info">
            <div className="stat-value">{total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">⏳</div>
          <div className="stat-info">
            <div className="stat-value">{pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div className="stat-info">
            <div className="stat-value">{completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Progress card */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Overall Progress</span>
              <span style={{ fontSize: 13, color: "var(--blue-500)", fontWeight: 600 }}>
                {progress}%
              </span>
            </div>
            <div className="progress-section">
              <div className="progress-label">
                <span>Tasks completed</span>
                <span>{completed} / {total}</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* High priority tasks */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">🔴 High Priority Pending</span>
              <button
                onClick={goToTasks}
                style={{
                  fontSize: 13, color: "var(--blue-500)", fontWeight: 600,
                  background: "none", border: "none", cursor: "pointer"
                }}
              >
                View all →
              </button>
            </div>

            {highPriority.length === 0 ? (
              <div className="empty-state" style={{ padding: "28px 24px" }}>
                <div className="empty-icon" style={{ fontSize: 32 }}>🎉</div>
                <div className="empty-text">No urgent tasks!</div>
                <div className="empty-sub">All high-priority tasks are done.</div>
              </div>
            ) : (
              <div className="task-list">
                {highPriority.slice(0, 4).map((task, i) => (
                  <div
                    key={task.id}
                    className="task-item"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <div className="task-check" />
                    <span className="task-title">{task.title}</span>
                    <span className="priority-badge high">high</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column — tips */}
        <div className="card tips-card" style={{ alignSelf: "start" }}>
          <div className="card-header">
            <span className="card-title">💡 Productivity Tips</span>
          </div>
          {tips.map((tip, i) => (
            <div className="tip-item" key={i}>
              <span className="tip-icon">{tip.icon}</span>
              <div className="tip-text">
                <strong>{tip.title}</strong>
                {tip.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;