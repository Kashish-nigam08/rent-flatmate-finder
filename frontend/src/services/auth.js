import api from "./api";

// Register (JSON)
export const registerUser = async (userData) => {
    return await api.post("/register", userData);
};

// Login (OAuth2 Form Data)
export const loginUser = async (credentials) => {

    const formData = new URLSearchParams();

    formData.append("username", credentials.email);
    formData.append("password", credentials.password);

    return await api.post(
        "/login",
        formData,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
};