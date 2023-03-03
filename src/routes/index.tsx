import { Route, Routes } from "react-router-dom";
import { RegisterUserForm } from "../components/Form/registerUserForm";
import DetailedViewPageVehicle from "../pages/detailedViewPageVehicle";
import ForgotPassword from "../pages/forgotPassword";
import Home from "../pages/home";
import LoginUser from "../pages/loginUserForm";
import { RegisterUserPage } from "../pages/registerUserForm";
import UserAdvertiserPage from "../pages/userAdvertiserPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterUserPage />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detailed-vehicle" element={<DetailedViewPageVehicle />} />
      <Route path="/userProfile" element={<UserAdvertiserPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default MainRoutes;
