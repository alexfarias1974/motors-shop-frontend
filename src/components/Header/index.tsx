import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import Logo from "../../assets/Motors shop.svg";
import Button from "../Button";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { IUser } from "../../interfaces/user.interface";

const Header = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [isActiveNavBar, setIsActiveNavBar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({} as IUser);

  useEffect(() => {
    const token = localStorage.getItem("@tokenId:token");
    if (token) {
      setIsLogin(true);
      api
        .get("users/profile", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log(res.data);
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isActiveNavBar]);

  return (
    <>
      <header
        className="flex justify-between items-center h-20 bg-grey10 border-grey6 px-[3.75rem] border-b-2 max-md:px-[1rem]"
        id="header"
      >
        <img
          src={Logo}
          alt="Motors shop Logo"
          className="hover:cursor-pointer"
          onClick={() => navigate("/home")}
        />
        <div className="md:hidden w-[2.875rem] h-[2.875rem] flex justify-center items-center">
          {isActiveMenu ? (
            <IoClose onClick={() => setIsActiveMenu(!isActiveMenu)} />
          ) : (
            <GiHamburgerMenu onClick={() => setIsActiveMenu(!isActiveMenu)} />
          )}
        </div>
        <div className="max-md:hidden flex justify-around items-center h-20">
          <div className="flex gap-11 mr-11">
            <a className="font-semibold text-grey2 cursor-pointer" href="#cars">
              Carros
            </a>
            <a
              className="font-semibold text-grey2 cursor-pointer"
              href="#motorcycles"
            >
              Motos
            </a>
            <a
              className="font-semibold text-grey2 cursor-pointer"
              href="#auction"
            >
              Leilão
            </a>
          </div>
          <div className="flex items-center gap-11 h-20 border-grey6 border-l-2">
            {isLogin ? (
              <div
                className="flex justify-center items-center gap-3 ml-11 cursor-pointer"
                onClick={() => setIsActiveNavBar(!isActiveNavBar)}
              >
                <div className="flex justify-center items-center bg-brand2 h-8 w-8 rounded-[100%]">
                  <span className="text-whiteFixed font-semibold">
                    {userInfo.name ? userInfo.name[0].toUpperCase() : ""}
                  </span>
                </div>
                <p>{userInfo.name}</p>
              </div>
            ) : (
              <>
                <span
                  className="ml-11 font-semibold text-grey2 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Fazer Login
                </span>
                <button
                  className="bg-grey10 text-grey0 border-2 border-grey4 hover:text-whiteFixed hover:bg-grey1 h-12 max-md-2[20.813rem] md:w-36 rounded font-semibold text-base"
                  onClick={() => navigate("/register")}
                >
                  Cadastrar
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {isActiveNavBar && (
        <div className="absolute top-[4.25rem] right-[0.9rem]">
          <NavBar accountType={userInfo.accountType} />
        </div>
      )}

      {isActiveMenu && (
        <div className="md:hidden shadow-[0px_40px_40px_rgba(0,0,0,0.09)] absolute w-[100%]">
          <div className="h-[14.75rem] bg-whiteFixed flex flex-col gap-11 py-[2rem] px-4 border-b-[1px] border-grey4">
            <a className="font-semibold text-grey2" href="#cars">
              Carros
            </a>
            <a className="font-semibold text-grey2" href="#motorcycles">
              Motos
            </a>
            <a className="font-semibold text-grey2" href="#auction">
              Leilão
            </a>
          </div>
          <div className="flex flex-col gap-11 bg-whiteFixed h-[11.5rem] py-[2rem] px-4">
            <span
              className="font-semibold text-grey2"
              onClick={() => navigate("/login")}
            >
              Fazer Login
            </span>
            <div className="flex">
              <button
                className="bg-grey10 text-grey0 border-2 border-grey4 hover:text-whiteFixed hover:bg-grey1 h-12 max-md-2[20.813rem] md:w-36 w-full rounded font-semibold text-base"
                onClick={() => navigate("/register")}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
