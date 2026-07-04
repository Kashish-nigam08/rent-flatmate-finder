import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function BrowseListings() {

    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const response = await api.get("/listings");
            setListings(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-900 text-white p-10">

                <h1 className="text-4xl font-bold mb-8">
                    Browse Listings
                </h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {listings.map((listing) => (

                        <div
                            key={listing.id}
                            className="bg-slate-800 rounded-xl overflow-hidden shadow-lg"
                        >

                            <img
                                src={listing.photo_url}
                                alt={listing.title}
                                className="w-full h-52 object-cover"
                            />

                            <div className="p-5">

                                <h2 className="text-2xl font-bold">
                                    {listing.title}
                                </h2>

                                <p className="mt-2">
                                    📍 {listing.location}
                                </p>

                                <p className="text-green-400 mt-2">
                                    ₹ {listing.rent}
                                </p>

                                <p>🛏 {listing.room_type}</p>

                                <p>🪑 {listing.furnishing_status}</p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </>
    );
}

export default BrowseListings;