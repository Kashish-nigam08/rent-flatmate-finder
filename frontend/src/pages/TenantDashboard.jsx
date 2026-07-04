import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
function TenantDashboard() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-900 text-white p-10">

        <h1 className="text-4xl font-bold mb-8">
          Tenant Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        

          <Link
to="/tenant-profile"
className="bg-slate-800 rounded-xl p-6 shadow-lg hover:bg-slate-700 transition block"
>

<h2 className="text-xl font-semibold">

👤 My Profile

</h2>

<p className="text-slate-400 mt-2">

Update Profile

</p>

</Link>
<Link
    to="/browse-listings"
    className="bg-slate-800 rounded-xl p-6 shadow-lg hover:bg-slate-700 transition block"
>

    <h2 className="text-xl font-semibold">
        🏠 Browse Listings
    </h2>

    <p className="text-slate-400 mt-2">
        View Available Rooms
    </p>

</Link>
        <Link
to="/compatibility"
className="bg-slate-800 rounded-xl p-6 shadow-lg hover:bg-slate-700 transition block"
>

<h2 className="text-xl font-semibold">

🤖 Compatibility

</h2>

<p className="text-slate-400 mt-2">

Calculate AI Score

</p>

</Link>
 <Link
to="/interest"
className="bg-slate-800 rounded-xl p-6 shadow-lg hover:bg-slate-700 transition block"
>

<h2 className="text-xl font-semibold">

❤️ Interest Request

</h2>

<p className="text-slate-400 mt-2">

Send Interest

</p>

</Link>

          <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold">💬 Chat</h2>
            <p className="text-slate-400 mt-2">
              Talk to owners.
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default TenantDashboard;