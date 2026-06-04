import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Dashboard from "./pages/Dashboard";

function App() {
  const [tasks, setTasks] = useState([]);
  const [activePage, setActivePage] = useState("tasks");
  const [filter, setFilter] = useState("all");

  const API_URL = "http://localhost:5000/api/tasks";

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title, priority) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          priority,
        }),
      });

      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
      });

      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const pending = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">✦</div>
          <span className="logo-text">TaskFlow</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${
              activePage === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActivePage("dashboard")}
          >
            <span className="nav-icon">⊞</span>
            Dashboard
          </button>

          <button
            className={`nav-item ${
              activePage === "tasks" ? "active" : ""
            }`}
            onClick={() => setActivePage("tasks")}
          >
            <span className="nav-icon">◈</span>
            My Tasks
            {pending > 0 && (
              <span className="nav-badge">
                {pending}
              </span>
            )}
          </button>
        </nav>

        <div className="sidebar-footer">
          {tasks.length} total · {completed} done
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activePage === "dashboard" && (
          <Dashboard
            tasks={tasks}
            pending={pending}
            completed={completed}
            goToTasks={() =>
              setActivePage("tasks")
            }
          />
        )}

        {activePage === "tasks" && (
          <div className="page-fade">
            <div className="page-header">
              <h1>My Tasks</h1>
              <p>Stay organised, stay ahead.</p>
            </div>

            {/* Stats */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-icon blue">📋</div>
                <div className="stat-info">
                  <div className="stat-value">
                    {tasks.length}
                  </div>
                  <div className="stat-label">
                    Total Tasks
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">
                  ⏳
                </div>
                <div className="stat-info">
                  <div className="stat-value">
                    {pending}
                  </div>
                  <div className="stat-label">
                    Pending
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">
                  ✅
                </div>
                <div className="stat-info">
                  <div className="stat-value">
                    {completed}
                  </div>
                  <div className="stat-label">
                    Completed
                  </div>
                </div>
              </div>
            </div>

            {/* Add Task */}
            <div
              className="card"
              style={{ marginBottom: 20 }}
            >
              <div className="card-header">
                <span className="card-title">
                  Add New Task
                </span>
              </div>

              <div className="task-form-wrap">
                <TaskForm addTask={addTask} />
              </div>
            </div>

            {/* Task List */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">
                  Task List
                </span>
              </div>

              <div className="filter-bar">
                {[
                  "all",
                  "active",
                  "completed",
                ].map((f) => (
                  <button
                    key={f}
                    className={`filter-btn ${
                      filter === f
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setFilter(f)
                    }
                  >
                    {f.charAt(0).toUpperCase() +
                      f.slice(1)}
                  </button>
                ))}
              </div>

              <TaskList
                tasks={filteredTasks}
                deleteTask={deleteTask}
                toggleComplete={
                  toggleComplete
                }
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;