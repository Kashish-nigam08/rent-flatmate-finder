import { useState } from "react";
import api from "../services/api";

function TenantProfile() {

    const [formData, setFormData] = useState({
        preferred_location: "",
        min_budget: "",
        max_budget: "",
        move_in_date: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/tenant/profile", formData);

            alert("Profile Saved Successfully!");

        } catch (error) {

            alert(error.response?.data?.detail || "Failed");

        }

    };

    return (

        <div className="min-h-screen bg-slate-900 flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 p-8 rounded-xl w-[500px]"
            >

                <h1 className="text-3xl text-white mb-6">

                    Tenant Profile

                </h1>

                <input
                    name="preferred_location"
                    placeholder="Preferred Location"
                    className="w-full p-3 mb-3 rounded bg-slate-700 text-white"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="min_budget"
                    placeholder="Minimum Budget"
                    className="w-full p-3 mb-3 rounded bg-slate-700 text-white"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="max_budget"
                    placeholder="Maximum Budget"
                    className="w-full p-3 mb-3 rounded bg-slate-700 text-white"
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="move_in_date"
                    className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
                    onChange={handleChange}
                />

                <button className="w-full bg-purple-600 py-3 rounded">

                    Save Profile

                </button>

            </form>

        </div>

    );

}

export default TenantProfile;