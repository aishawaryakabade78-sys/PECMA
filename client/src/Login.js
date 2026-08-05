import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        const { role, name } = res.data;

        localStorage.setItem("role", role);
        localStorage.setItem("name", name);

        navigate("/dashboard");
      })
      .catch((err) =>
        alert(err.response?.data?.message || "Login failed")
      );
  };

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#356ad6,#a53d76)",
    },

    card: {
      width: "380px",
      background: "#fff",
      borderRadius: "10px",
      padding: "40px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    },

    heading: {
      textAlign: "center",
      fontSize: "40px",
      fontWeight: "bold",
      marginBottom: "40px",
      fontFamily: "Georgia",
    },

    input: {
      width: "100%",
      border: "none",
      borderBottom: "2px solid #ccc",
      outline: "none",
      padding: "12px 5px",
      fontSize: "16px",
      marginBottom: "25px",
      background: "transparent",
    },

    forgot: {
      color: "#777",
      cursor: "pointer",
      marginBottom: "25px",
    },

    button: {
      width: "100%",
      padding: "12px",
      borderRadius: "30px",
      border: "2px solid #444",
      background: "#fff",
      fontSize: "20px",
      fontWeight: "bold",
      cursor: "pointer",
    },

    signup: {
      textAlign: "center",
      marginTop: "30px",
      color: "#444",
    },

    link: {
      color: "#1d4ed8",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Login</h1>

        <input
          style={styles.input}
          type="email"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div style={styles.forgot}>Forget Password?</div>

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <div style={styles.signup}>
          Not a Member? <span style={styles.link}>Signup</span>
        </div>
      </div>
    </div>
  );
}

export default Login;