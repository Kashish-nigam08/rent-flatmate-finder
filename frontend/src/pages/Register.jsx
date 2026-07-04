import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/auth";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        role: "tenant",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await registerUser(formData);

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {
        console.log("Error:", error);
        console.log("Response:", error.response);
        console.log("Data:", error.response?.data);

        alert(error.message);
    }

    };

    return (

        <div className="min-h-screen bg-slate-900 flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 p-10 rounded-xl w-96 shadow-xl"
            >

                <h1 className="text-3xl text-white mb-8 font-bold">

                    Register

                </h1>

                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
                />

                <select
                    name="role"
                    onChange={handleChange}
                    className="w-full mb-6 p-3 rounded bg-slate-700 text-white"
                >

                    <option value="tenant">
                        Tenant
                    </option>

                    <option value="owner">
                        Owner
                    </option>

                </select>

                <button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
                >
                    Register
                </button>

            </form>

        </div>

    );

}

export default Register;