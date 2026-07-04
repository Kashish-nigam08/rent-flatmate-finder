import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center text-white">

                <h1 className="text-6xl font-bold mb-6">
                    Find Your Perfect Flatmate
                </h1>

                <p className="text-xl text-slate-300 mb-10">
                    AI Powered Room & Flatmate Matching Platform
                </p>

                <button
    onClick={() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        } else {
            navigate("/register");
        }
    }}
    className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl text-xl"
>
    Get Started
</button>
            </div>
        </>
    );
}

export default Home;