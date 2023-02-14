const Footer = () => {
  return (
    <footer className="bg-grey0 absolute w-100% bottom-0 left-0  w-full m-auto text-center ">
      <div className="text-whiteFixed flex flex-col gap-5 p-5 font-inter md:flex-row justify-between">
        <h3>MOTORS shop</h3>
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
