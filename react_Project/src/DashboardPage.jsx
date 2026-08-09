import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

    const [user, setUser] = useState(null);

    // Get logged-in user
    const getUser = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    }
                }
            );

            console.log("User response:", response.data);

            setUser(response.data.user);

        } catch (error) {

            console.log("User error:", error.response?.data);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.href = "/login";
            }
        }
    };


    // Logout
    const handleLogout = async () => {

        const token = localStorage.getItem("token");

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    }
                }
            );

            console.log("Logout response:", response.data);

            alert("Logout successful");

        } catch (error) {

            console.log("Logout error:", error.response?.data);

        } finally {

            // Always remove local data
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // Go to login
            window.location.href = "/login";
        }
    };


    useEffect(() => {
        getUser();
    }, []);


    return (
        <div>

            <h1>Dashboard</h1>

            {user ? (
                <div>

                    <h2>
                        Welcome {user.name}
                    </h2>

                    <p>
                        Email: {user.email}
                    </p>

                </div>
            ) : (
                <p>Loading user...</p>
            )}

            {/* Logout button OUTSIDE user condition */}
            <button onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
};

export default Dashboard;