import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
function OwnerDashboard() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-900 text-white p-10">

        <h1 className="text-4xl font-bold mb-8">
          Owner Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Link
  to="/create-listing"
  className="bg-slate-800 rounded-xl p-6 shadow-lg hover:bg-slate-700 transition duration-300 block"
>
  <h2 className="text-xl font-semibold">
    🏠 Create Listing
  </h2>

  <p className="text-slate-400 mt-2">
    Add a new room listing.
  </p>
</Link>

          <Link
    to="/my-listings"
    className="bg-slate-800 rounded-xl p-6 shadow-lg hover:bg-slate-700 transition duration-300 block"
>

    <h2 className="text-xl font-semibold">
        📋 My Listings
    </h2>

    <p className="text-slate-400 mt-2">
        View all your listings.
    </p>

</Link>

          <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold">❤️ Interest Requests</h2>
            <p className="text-slate-400 mt-2">
              Accept or reject requests.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold">💬 Chat</h2>
            <p className="text-slate-400 mt-2">
              Chat with tenants.
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default OwnerDashboard;