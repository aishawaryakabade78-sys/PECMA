import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                {
                    email: email,
                    password: password
                }
            );

            console.log("Login Response:", response.data);

            // Store token
            localStorage.setItem(
                "token",
                response.data.token
            );

            // Store user
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            // Get user
            const user = response.data.user;

            console.log("Logged User:", user);
            console.log("User Role:", user.role);

            alert("Login successful");

            // =========================
            // ROLE BASED REDIRECT
            // =========================

            if (user.role === "admin") {

                navigate("/admin/dashboard");

            } else if (user.role === "customer") {

                navigate("/shop");

            } else {

                alert("Invalid user role");

            }

        } catch (error) {

            console.log(
                "Login Error:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-400 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <div className="bg-white rounded-[30px] shadow-2xl px-10 py-8">

                    <div className="flex justify-between items-center mb-5">

                        <button
                            type="button"
                            className="w-7 h-7 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center hover:bg-gray-100"
                        >
                            ×
                        </button>

                        <span className="text-xs text-gray-400">
                            Need help?
                        </span>

                    </div>

                    <h1 className="text-center text-2xl font-bold text-indigo-600 mb-7">
                        Log in
                    </h1>

                    <form onSubmit={handleLogin}>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                            className="
                                w-full
                                h-12
                                px-4
                                border
                                border-gray-300
                                rounded-md
                                text-sm
                                outline-none
                                focus:border-purple-500
                                focus:ring-2
                                focus:ring-purple-200
                                transition
                            "
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                            className="
                                w-full
                                h-12
                                px-4
                                mt-4
                                border
                                border-gray-300
                                rounded-md
                                text-sm
                                outline-none
                                focus:border-purple-500
                                focus:ring-2
                                focus:ring-purple-200
                                transition
                            "
                        />

                        <div className="text-center mt-2 mb-5">

                            <Link
                                to="/forgot-password"
                                className="text-[11px] text-gray-500 hover:text-purple-600"
                            >
                                forgot password?
                            </Link>

                        </div>

                        <button
                            type="submit"
                            className="
                                w-full
                                h-12
                                rounded-md
                                bg-gradient-to-r
                                from-purple-500
                                to-indigo-500
                                text-white
                                font-semibold
                                text-sm
                                shadow-md
                                hover:from-purple-600
                                hover:to-indigo-600
                                transition
                                duration-200
                            "
                        >
                            Login
                        </button>

                    </form>

                    <p className="text-center text-xs text-gray-500 mt-6">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="text-purple-600 font-semibold hover:underline"
                        >
                            Sign Up
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;