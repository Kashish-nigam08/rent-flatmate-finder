import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/auth";

function Login() {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser(credentials);

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "Login Failed"
            );

        }

    };

    return (

        <div className="min-h-screen bg-slate-900 flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 p-10 rounded-xl w-96 shadow-xl"
            >

                <h1 className="text-3xl text-white mb-8 font-bold">

                    Login

                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full mb-5 p-3 rounded bg-slate-700 text-white"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full mb-6 p-3 rounded bg-slate-700 text-white"
                />

                <button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
                >
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;