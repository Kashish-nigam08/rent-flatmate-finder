import { useState } from "react";
import api from "../services/api";

function CreateListing() {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        rent: "",
        available_from: "",
        room_type: "",
        furnishing_status: "",
        photo_url: ""
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

            await api.post("/listings", formData);

            alert("Listing Created Successfully!");

            setFormData({
                title: "",
                description: "",
                location: "",
                rent: "",
                available_from: "",
                room_type: "",
                furnishing_status: "",
                photo_url: ""
            });

        }

        catch (error) {

            alert(
                error.response?.data?.detail ||
                "Failed to create listing."
            );

        }

    };

    return (

        <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 p-10 rounded-xl w-[700px]"
            >

                <h1 className="text-3xl font-bold mb-8">

                    Create Room Listing

                </h1>

                <input
                    className="w-full p-3 rounded mb-4 bg-slate-700"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <textarea
                    className="w-full p-3 rounded mb-4 bg-slate-700"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    className="w-full p-3 rounded mb-4 bg-slate-700"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />

                <input
                    className="w-full p-3 rounded mb-4 bg-slate-700"
                    type="number"
                    name="rent"
                    placeholder="Rent"
                    value={formData.rent}
                    onChange={handleChange}
                />

                <input
                    className="w-full p-3 rounded mb-4 bg-slate-700"
                    type="date"
                    name="available_from"
                    value={formData.available_from}
                    onChange={handleChange}
                />

                <input
                    className="w-full p-3 rounded mb-4 bg-slate-700"
                    name="room_type"
                    placeholder="Room Type"
                    value={formData.room_type}
                    onChange={handleChange}
                />

                <input
                    className="w-full p-3 rounded mb-4 bg-slate-700"
                    name="furnishing_status"
                    placeholder="Furnishing Status"
                    value={formData.furnishing_status}
                    onChange={handleChange}
                />

                <input
                    className="w-full p-3 rounded mb-6 bg-slate-700"
                    name="photo_url"
                    placeholder="Photo URL"
                    value={formData.photo_url}
                    onChange={handleChange}
                />

                <button
                    className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg"
                >
                    Create Listing
                </button>

            </form>

        </div>

    );

}

export default CreateListing;