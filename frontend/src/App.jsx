import { Routes, Route } from "react-router-dom";
import MyListings from "./pages/MyListings";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateListing from "./pages/CreateListing";
import ProtectedRoute from "./components/ProtectedRoute";
import EditListing from "./pages/EditListing";
import TenantProfile from "./pages/TenantProfile";
import Compatibility from "./pages/Compatibility";
import Interest from "./pages/Interest";
import BrowseListings from "./pages/BrowseListings";
function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>

                        <Dashboard />

                    </ProtectedRoute>
                }
            />
            <Route
    path="/create-listing"
    element={
        <ProtectedRoute>
            <CreateListing />
        </ProtectedRoute>
    }
/>
<Route
    path="/my-listings"
    element={
        <ProtectedRoute>
            <MyListings />
        </ProtectedRoute>
    }
/>
<Route
path="/edit-listing/:id"
element={
<ProtectedRoute>
<EditListing/>
</ProtectedRoute>
}
/>
<Route
path="/tenant-profile"
element={
<ProtectedRoute>
<TenantProfile/>
</ProtectedRoute>
}
/>
<Route
path="/compatibility"
element={
<ProtectedRoute>
<Compatibility/>
</ProtectedRoute>
}
/>
<Route
path="/interest"
element={
<ProtectedRoute>
<Interest/>
</ProtectedRoute>
}
/>
<Route
    path="/browse-listings"
    element={
        <ProtectedRoute>
            <BrowseListings />
        </ProtectedRoute>
    }
/>
        </Routes>

    );

}

export default App;