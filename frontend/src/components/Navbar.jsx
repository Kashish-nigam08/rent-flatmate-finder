import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <nav className="bg-slate-950 shadow-lg">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

                <Link
                    to="/dashboard"
                    className="text-2xl font-bold text-purple-400"
                >
                    RentFlatmate
                </Link>

                <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;