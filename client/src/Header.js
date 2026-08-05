import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  // Page title mapping
  const pageTitles = {
    "/": "Login",
    "/dashboard": "Dashboard",
    "/profile": "Profile",
    "/settings": "Settings"
  };

  const pageTitle = pageTitles[location.pathname] || "Page";

  return (
    <div style={styles.header}>
      <h2 style={styles.title}>{pageTitle}</h2>
    </div>
  );
}

const styles = {
  header: {
    background: "white",
    padding: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #ddd"
  },
  title: {
    margin: 0,
    color: "black",
    fontWeight: "600"
  }
};

export default Header;
