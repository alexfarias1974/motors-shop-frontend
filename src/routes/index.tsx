import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterUserForm } from "../components/Form/registerUserForm";
import DetailedViewPageVehicle from "../pages/detailedViewPageVehicle";
import ForgotPassword from "../pages/forgotPassword";
import Home from "../pages/home";
import LoginUser from "../pages/loginUserForm";
import { RegisterUserPage } from "../pages/registerUserForm";
import UserAdvertiserPage from "../pages/userAdvertiserPage";

interface IPrivateRoute {
  children: ReactNode;
  redirectTo: string;
}

const PrivateRoute = ({ children, redirectTo }: IPrivateRoute) => {
  const isAuthenticated =
    window.localStorage.getItem("@tokenId:token") !== null;

  toast.error("Você precisa estar logado para acessar essa rota");

  return <>{isAuthenticated ? children : <Navigate to={redirectTo} />}</>;
};

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterUserPage />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/userProfile"
        element={
          <PrivateRoute redirectTo="/">
            <UserAdvertiserPage />
          </PrivateRoute>
        }
      />
      <Route path="/detailed-vehicle" element={<DetailedViewPageVehicle />} />
      <Route path="/userProfile" element={<UserAdvertiserPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default MainRoutes;
