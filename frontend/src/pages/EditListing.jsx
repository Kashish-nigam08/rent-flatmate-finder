import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditListing() {

    const { id } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        loadListing();
    }, []);

    const loadListing = async () => {

        const res = await api.get(`/listings/${id}`);

        setFormData(res.data);

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await api.put(`/listings/${id}`, formData);

        alert("Listing Updated!");

        navigate("/my-listings");

    };

    return (

        <div className="min-h-screen bg-slate-900 flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 p-8 rounded-xl w-[650px]"
            >

                <h1 className="text-white text-3xl mb-6">

                    Edit Listing

                </h1>

                {Object.keys(formData).map((key) => (

                    key !== "id" &&
                    key !== "owner_id" &&
                    key !== "is_filled" &&

                    <input
                        key={key}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="w-full p-3 mb-3 rounded bg-slate-700 text-white"
                    />

                ))}

                <button className="w-full bg-purple-600 py-3 rounded">

                    Update Listing

                </button>

            </form>

        </div>

    );

}

export default EditListing;