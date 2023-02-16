import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import Logo from "../../assets/Motors shop.svg";
import Button from "../Button";

const Header = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center h-20 bg-grey10 border-grey6 px-[3.75rem] border-b-2 max-md:px-[1rem]">
        <img src={Logo} alt="Motors shop Logo" />
        <div className="md:hidden w-[2.875rem] h-[2.875rem] flex justify-center items-center">
          {isActiveMenu ? (
            <IoClose onClick={() => setIsActiveMenu(!isActiveMenu)} />
          ) : (
            <GiHamburgerMenu onClick={() => setIsActiveMenu(!isActiveMenu)} />
          )}
        </div>
        <div className="max-md:hidden flex justify-around items-center h-20">
          <div className="flex gap-11 mr-11">
            <span className="font-semibold text-grey2 cursor-pointer">
              Carros
            </span>
            <span className="font-semibold text-grey2 cursor-pointer">
              Motos
            </span>
            <span className="font-semibold text-grey2 cursor-pointer">
              Leilão
            </span>
          </div>
          <div className="flex items-center gap-11 h-20 border-grey6 border-l-2">
            {isLogin ? (
              <div className="flex justify-center items-center gap-3 ml-11 cursor-pointer">
                <div className="flex justify-center items-center bg-brand2 h-8 w-8 rounded-[100%]">
                  <span className="text-whiteFixed font-semibold">SL</span>
                </div>
                <p>Samuel Leão</p>
              </div>
            ) : (
              <>
                <span
                  className="ml-11 font-semibold text-grey2 cursor-pointer"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  Fazer Login
                </span>
                <Button
                  text="Cadastrar"
                  color="bg-grey10"
                  hoverColor="bg-grey1"
                  hoverTextColor="text-whiteFixed"
                  textColor="text-grey0"
                  border="border-2"
                  borderColor="border-grey4"
                />
              </>
            )}
          </div>
        </div>
      </header>

      {isActiveMenu && (
        <div className="md:hidden shadow-[0px_40px_40px_rgba(0,0,0,0.09)] absolute w-[100%]">
          <div className="h-[14.75rem] bg-whiteFixed flex flex-col gap-11 py-[2rem] px-4 border-b-[1px] border-grey4">
            <span className="font-semibold text-grey2">Carros</span>
            <span className="font-semibold text-grey2">Motos</span>
            <span className="font-semibold text-grey2">Leilão</span>
          </div>
          <div className="flex flex-col gap-11 bg-whiteFixed h-[11.5rem] py-[2rem] px-4">
            <span className="font-semibold text-grey2">Fazer Login</span>
            <div className="flex">
              <Button
                text="Cadastrar"
                color="bg-grey10"
                textColor="grey0"
                border="border-2"
                borderColor="border-grey4"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
