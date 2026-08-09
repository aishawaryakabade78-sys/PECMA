import React, { useState } from "react";
import axios from "axios";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation
                }
            );

            console.log(response.data);

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

        } catch (error) {

            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };


    return (
        <div>

            <h1>Register</h1>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br /><br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) =>
                        setPasswordConfirmation(e.target.value)
                    }
                />

                <br /><br />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>
    );
};

export default Register;