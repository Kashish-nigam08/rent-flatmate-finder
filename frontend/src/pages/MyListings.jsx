import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      // Get current logged-in owner
      const response = await api.get("/my-listings");
setListings(response.data);
    } catch (error) {

    
        console.log(error);

        alert("Failed to load listings.");

}finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }
const deleteListing = async (listingId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this listing?"
    );

    if (!confirmDelete) return;

    try {

        await api.delete(`/listings/${listingId}`);

        alert("Listing deleted successfully!");

        fetchListings();

    } catch (error) {

        alert(
            error.response?.data?.detail ||
            "Failed to delete listing."
        );

    }

};
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-900 text-white p-10">

        <h1 className="text-4xl font-bold mb-8">
          My Listings
        </h1>

        {listings.length === 0 ? (
          <p className="text-slate-400">
            No listings found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-slate-800 rounded-xl shadow-lg overflow-hidden"
              >
                <img
    src={
        listing.photo_url && listing.photo_url.trim() !== ""
            ? listing.photo_url
            : "https://via.placeholder.com/400x250?text=No+Image"
    }
    alt={listing.title}
    className="h-48 w-full object-cover"
    onError={(e) => {
        e.target.src =
            "https://via.placeholder.com/400x250?text=No+Image";
    }}
/>
                <div className="p-5">

                  <h2 className="text-2xl font-bold">
                    {listing.title}
                  </h2>

                  <p className="text-slate-400 mt-2">
                    📍 {listing.location}
                  </p>

                  <p className="text-green-400 font-bold mt-2">
                    ₹ {listing.rent}
                  </p>

                  <p className="mt-2">
                    🛏 {listing.room_type}
                  </p>

                  <p>
                    🪑 {listing.furnishing_status}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <Link
to={`/edit-listing/${listing.id}`}
className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
>
Edit
</Link>
                    <button
    onClick={() => deleteListing(listing.id)}
    className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
>
    Delete
</button>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}

export default MyListings;