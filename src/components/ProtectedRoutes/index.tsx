import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";


import { LoginContext } from "../../context/loginContext";
import LoadingPage from "../LoadingPage";

const ProtectedRoutes = () => {
    const {user, loading} = useContext(LoginContext);

    if (loading) return <LoadingPage />;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;