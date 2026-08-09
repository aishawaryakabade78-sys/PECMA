import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        // Check password
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: confirmPassword
                }
            );

            console.log(
                "Register Response:",
                response.data
            );

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

            alert("Registration successful");

            // Go to Dashboard
            navigate("/dashboard");

        } catch (error) {

            console.log(
                "Register Error:",
                error.response?.data
            );

            // Laravel validation errors
            if (error.response?.data?.errors) {

                const errors = error.response.data.errors;

                const firstError =
                    Object.values(errors)[0]?.[0];

                alert(firstError || "Registration failed");

            } else {

                alert(
                    error.response?.data?.message ||
                    "Registration failed"
                );
            }
        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-400 flex items-center justify-center px-4">

            {/* Register Card */}
            <div className="w-full max-w-md">

                <div className="bg-white rounded-[30px] shadow-2xl px-10 py-8">

                    {/* Top Header */}
                    <div className="flex justify-between items-center mb-5">

                        {/* Close icon */}
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="w-7 h-7 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center hover:bg-gray-100"
                        >
                            ×
                        </button>

                        <span className="text-xs text-gray-400">
                            Need help?
                        </span>

                    </div>


                    {/* Title */}
                    <h1 className="text-center text-2xl font-bold text-indigo-600 mb-7">
                        Create Account
                    </h1>


                    {/* Register Form */}
                    <form onSubmit={handleRegister}>

                        {/* Full Name */}
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
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


                        {/* Email */}
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


                        {/* Password */}
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                            minLength={6}
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


                        {/* Confirm Password */}
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            required
                            minLength={6}
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


                        {/* Terms */}
                        <div className="flex items-center justify-center gap-2 mt-4 mb-5">

                            <input
                                type="checkbox"
                                required
                                className="accent-purple-600"
                            />

                            <span className="text-[10px] text-gray-500">
                                I accept the terms of the agreement
                            </span>

                        </div>


                        {/* Sign Up Button */}
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
                            Sign Up
                        </button>

                    </form>


                    {/* Login Link */}
                    <p className="text-center text-xs text-gray-500 mt-6">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-purple-600 font-semibold hover:underline"
                        >
                            Log in
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Register;