import Navbar from "./Navbar";
import React, { useState } from 'react'; // Line 2
import axios from 'axios';    

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={{ marginLeft: "220px", padding: "50px" }}>
        <h2>Welcome to Dashboard 🎉</h2>
      </div>
    </div>
  );
}

export default Dashboard;