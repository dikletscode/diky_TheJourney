import React, { CSSProperties, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/provider";
import profile from "../assets/proicon.png";
import logout from "../assets/logout.png";
import bookmark from "../assets/bookmark.png";
import write from "../assets/write.png";

const Image = ({
  image,
  inner,
  klik,
}: {
  image: string;
  inner: string;
  klik?: () => void;
}) => {
  return (
    <div className="flex items-center p-4 cursor-pointer" onClick={klik}>
      <img src={image} className="h-6 w-6 object-contain" />{" "}
      <p className="pl-4">{inner}</p>
    </div>
  );
};

const DropDownFilter = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
  setdate: () => void;
}) => {
  return (
    <>
      <div
        className="fixed bg-white z-50 right-16 p-5 shadow-main w-48 "
        onMouseLeave={close}
      >
        {isOpen ? (
          <>
            <div style={style.triangle}></div>

            <input type="date" />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default DropDownFilter;

const style = {
  triangle: {
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    right: "6px",
    position: "absolute",
    borderBottom: "20px solid white",
    top: "-15px",

    boxShadow: "0px 20px 4px rgba(0, 0, 0, 0), 4px 4px 20px rgba(0, 0, 0, 0)",
  } as CSSProperties,
};
