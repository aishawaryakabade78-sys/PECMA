import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ marginLeft: "200px", width: "100%" }}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;