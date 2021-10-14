import { type } from "os";
import React, { useContext } from "react";
import { EventContext } from "../context/provider";
const Modal = ({
  children,
  custom,
}: {
  children?: React.ReactNode;
  custom?: string;
}) => {
  const { eventDispatch } = useContext(EventContext);

  return (
    <div
      className={`min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-40 outline-none focus:outline-none bg-no-repeat bg-center bg-cover ${custom}`}
      id="modal-id"
    >
      <div
        className="absolute bg-black opacity-60 inset-0 z-0"
        onClick={() => eventDispatch({ type: "CLOSE_MODAL", payload: false })}
      ></div>
      <div className="w-full  max-w-sm p-10 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        {children}
      </div>
    </div>
  );
};
export default Modal;
