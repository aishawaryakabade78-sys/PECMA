import { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Profile() {
  const [activeTab, setActiveTab] = useState("add");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [tasks, setTasks] = useState([]);

  // Fetch Tasks
  const fetchTasks = async () => {
  try {
    const res = await fetch("http://localhost:5000/tasks");

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await res.json();

    console.log("Tasks Response:", data);
    console.log("Is Array:", Array.isArray(data));

    if (Array.isArray(data)) {
      setTasks(data);
    } else {
      console.error("Expected array but received:", data);
      setTasks([]);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    setTasks([]);
  }
};

  // Add Task
  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Please enter title");
      
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        setTitle("");
        setStatus("pending");

        fetchTasks();
        setActiveTab("list");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      alert(data.message);

      fetchTasks();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const styles = {
    container: {
      marginLeft: "240px",
      padding: "40px",
    },

    tabs: {
      display: "flex",
      marginBottom: "20px",
    },

    tab: {
      padding: "10px 20px",
      cursor: "pointer",
      borderBottom: "2px solid transparent",
    },

    activeTab: {
      borderBottom: "2px solid blue",
      fontWeight: "bold",
    },

    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
    },

    button: {
      padding: "10px 20px",
      background: "blue",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },

    th: {
      border: "1px solid #ddd",
      padding: "10px",
      background: "#f4f4f4",
      textAlign: "left",
    },

    td: {
      border: "1px solid #ddd",
      padding: "10px",
    },

    deleteBtn: {
      background: "red",
      color: "#fff",
      border: "none",
      padding: "6px 10px",
      cursor: "pointer",
      borderRadius: "4px",
    },
  };

  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        {/* Tabs */}
        <div style={styles.tabs}>
          <div
            style={{
              ...styles.tab,
              ...(activeTab === "add" ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab("add")}
          >
            ➕ Add Task
          </div>

          <div
            style={{
              ...styles.tab,
              ...(activeTab === "list" ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab("list")}
          >
            📋 Task List
          </div>
        </div>

        {/* Add Task */}
        {activeTab === "add" && (
          <div>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              style={styles.input}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">⏳ Pending</option>
              <option value="completed">✅ Completed</option>
            </select>

            <button style={styles.button} onClick={handleSubmit}>
              Add Task
            </button>
          </div>
        )}

        {/* Task List */}
        {activeTab === "list" && (
          <div>
            {tasks.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Title</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(tasks) &&
tasks.map((task) => (
                    <tr key={task.id}>
                      <td style={styles.td}>{task.id}</td>
                      <td style={styles.td}>{task.title}</td>
                      <td style={styles.td}>{task.status}</td>
                      <td style={styles.td}>
                        <button
                          style={styles.deleteBtn}
                          onClick={() => deleteTask(task.id)}
                        >
                          ❌ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;