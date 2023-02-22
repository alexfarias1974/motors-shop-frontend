const NavBar = () => {
  return (
    <div className="flex flex-col justify-between p-5 w-[12.5rem] h-[12.5rem] bg-grey9 rounded shadow-[0_4px_40px_-10px_rgba(0,0,0,0.25)]">
      <span className="text-grey2 cursor-pointer">Editar Perfil</span>
      <span className="text-grey2 cursor-pointer">Editar Endereço</span>
      <span className="text-grey2 cursor-pointer">Minhas Compras</span>
      <span className="text-grey2 cursor-pointer">Sair</span>
    </div>
  );
};

export default NavBar;
