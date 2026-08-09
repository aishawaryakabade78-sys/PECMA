import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login.jsx";

// import Register from "./Register.jsx";
 import Dashboard from "./DashboardPage.jsx";
 import Register from "./Register";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />

                {/* <Route path="/register" element={<Register />} /> */}


            </Routes>

        </BrowserRouter>
    );
}

export default App;