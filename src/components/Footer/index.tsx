import LogoMotors from "../../assets/Motors shop.png";

const Footer = () => {
  return (
    <footer className="bg-grey0 w-100% bottom-0 left-0  w-full m-auto text-center fixed">
      <div className="text-whiteFixed flex flex-col gap-5 p-5 font-inter md:flex-row justify-between items-center">
        <img src={LogoMotors} alt="Motors Shop logo" className="w-28" />
        <p>&copy; 2022 - Todos os direitos reservados</p>
        <a
          href="#header"
          className="bg-grey1 w-11 m-auto p-2 border-0 rounded-sm md:m-0"
        >
          ^
        </a>
      </div>
    </footer>
  );
};

export default Footer;
