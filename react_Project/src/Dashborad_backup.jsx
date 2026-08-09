
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

    const [user, setUser] = useState(null);

    // Get logged-in user
    const getUser = async () => {

        const token = localStorage.getItem("token");

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            setUser(response.data.user);

        } catch (error) {

            console.log(error.response?.data);

        }
    };


    // Logout
    const handleLogout = async () => {

        const token = localStorage.getItem("token");

        try {

            await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Remove token
            localStorage.removeItem("token");

            // Remove user
            localStorage.removeItem("user");

            alert("Logout successful");

            // Optional: redirect to login
            window.location.href = "/login";

        } catch (error) {

            console.log(error.response?.data);

        }
    };


    // Run when Dashboard loads
    useEffect(() => {
        getUser();
    }, []);


    return (
        <div>

            <h1>Dashboard</h1>

            {user && (
                <div>

                    <h2>
                        Welcome {user.name}
                    </h2>

                    <p>
                        Email: {user.email}
                    </p>

                    <button onClick={handleLogout}>
                        Logout
                    </button>

                </div>
            )}

        </div>
    );
};

export default Dashboard;
