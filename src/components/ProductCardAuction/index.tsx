import { BsArrowRight } from "react-icons/bs";
import { MdOutlineWatchLater } from "react-icons/md";

export const ProductCardAuction = ({ classname }: any) => {
  return (
    <>
      <div
        className={`mx-auto max-w-[46rem] h-[24.5rem] flex flex-col cursor-pointer ${classname}`}
      >
        <div className="bg-gradient-to-t from-grey0 to-grey4 h-[20.5rem] w-[46rem] relative rounded-t">
          <picture>
            <img
              className="w-full h-full object-cover absolute mix-blend-overlay"
              src="./src/assets/car_picture2.png"
              alt="Car Picture"
            />
          </picture>
          <div className="flex flex-row items-center justify-around bg-[#FFFFFF] w-[7rem] h-[1.875rem] rounded-full ml-[3rem] mt-[1.5rem]">
            <MdOutlineWatchLater className="" color="#4529E6" size={25} />
            <p className="font-lexend text-[1rem] font-medium text-grey1">
              01:58:00
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between rounded-b items-center h-[4rem] bg-brand1 hover:bg-[#41268E] cursor-pointer">
          <p className="ml-[3rem] font-Inter text-[1rem] font-semibold text-[#FFFFFF]">
            Acessar página do leilão
          </p>
          <BsArrowRight className="mr-[2rem]" color="white" size={30} />
        </div>
        <div className="ml-[3rem] mt-[-17rem] z-0">
          <h3 className="font-lexend text-[1.25rem] font-bold text-grey10 mt-3 mb-4">
            Ford Mustang MACH 1 5.0 V8 2023
          </h3>
          <p className="font-Inter text-[1rem] font-normal text-grey5 mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem...
          </p>
          <div className="flex flex-row items-center">
            <div className="bg-brand2 rounded-full w-8 h-[2rem] items-center flex justify-center text-center">
              <p className="font-Inter text-[0.875rem] font-medium text-[#FFFFFF]">
                R
              </p>
            </div>
            <div>
              <p className="font-medium text-[0.875rem] text-[#FFFFFF] ml-4">
                Rodrigo Tavares
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-4 items-center">
            <div className="flex flex-row font-Inter text-sm font-medium text-brand1">
              <h4 className="px-2 py-1 bg-brand4 rounded">2023</h4>
              <h4 className="px-2 py-1 ml-3 bg-brand4 rounded">0 KM</h4>
            </div>
            <div className="mr-[2rem] font-lexend font-medium text-base text-[#FFFFFF]">
              <h4 className="">R$ 1.250.000,00</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
