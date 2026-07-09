import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import OwnerDashboard from "./OwnerDashboard";
import TenantDashboard from "./TenantDashboard";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get("/me");
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error("GET /me failed:", error.response?.data || error.message);

      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  if (user.role === "owner") {
    return <OwnerDashboard />;
  }

  return <TenantDashboard />;
}

export default Dashboard;