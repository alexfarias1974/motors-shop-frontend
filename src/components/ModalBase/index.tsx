import { ReactNode, useEffect, useRef } from "react";

export interface iModal {
  children: ReactNode;
  setIs: (arg0: boolean) => void;
  width?: string;
  heigth?: string;
  justifyContent?: string;
  alignItems?: string;
  justifyContentModal?: string;
  alignItemsModal?: string;
}

export interface IEvent {
  type: string;
  target: HTMLDivElement | any;
}

const ModalBase = ({
  children,
  setIs,
  width,
  heigth,
  justifyContent,
  alignItems,
}: iModal) => {
  const modalRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    function handleOutClick(event: IEvent) {
      if (!modalRef.current?.contains(event.target)) {
        setIs(false);
      }
    }

    document.addEventListener("mousedown", handleOutClick);

    return () => {
      document.removeEventListener("mousedown", handleOutClick);
    };
  }, [setIs]);

  return (
    <div
      className={`fixed flex ${alignItems ? alignItems : "items-center"} ${
        justifyContent ? justifyContent : "justify-center"
      } flex-col w-full min-h-screen bg-grey11 inset-0`}
    >
      <div
        className={`${width ? width : "w-auto"} ${
          heigth ? heigth : "h-auto"
        } flex justify-center items-center flex-wrap relative`}
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalBase;
