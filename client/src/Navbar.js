import { Link } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");

  return (
    <div style={styles.sidebar}>
      <h3 style={{ color: "white" }}>My App</h3>
      <Link to="/dashboard" style={styles.link}>Dashboard</Link>

      {/* Teacher/Admin links */}
      {["admin","superadmin","teacher","headmaster"].includes(role) && (
        <>
          <Link to="/profile" style={styles.link}>Profile</Link>
          <Link to="/settings" style={styles.link}>Settings</Link>
        </>
      )}

      {/* Student */}
      {role === "student" && <Link to="/profile" style={styles.link}>Profile</Link>}

      {/* Parent */}
      {role === "parent" && <Link to="/profile" style={styles.link}>Student Info</Link>}

      <Link to="/" style={styles.link} onClick={() => localStorage.clear()}>Logout</Link>
    </div>
  );
}

const styles = {
  sidebar: {
    height: "100vh",
    width: "200px",
    backgroundColor: "#222",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0
  },
  link: { color: "white", textDecoration: "none", marginBottom: "20px", fontSize: "16px" }
};

export default Navbar;