import { Route, Routes } from "react-router-dom";
import { RegisterUserForm } from "../components/Form/registerUserForm";
import Home from "../pages/home";
import LoginUser from "../pages/loginUserForm";
import UserAdvertiserPage from "../pages/userAdvertiserPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterUserForm />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/home" element={<Home />} />
      <Route path="/userProfile" element={<UserAdvertiserPage />} />
    </Routes>
  );
};

export default MainRoutes;
