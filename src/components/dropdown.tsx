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
  className,
}: {
  image: string;
  inner: string;
  klik?: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center p-4 cursor-pointer hover:bg-blue-100 ${className}`}
      onClick={klik}
    >
      <img src={image} className="h-6 w-6 object-contain" />{" "}
      <p className="pl-4">{inner}</p>
    </div>
  );
};

const DropDown = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const { state, dispatch } = useContext(UserContext);

  const logoutAction = () => {
    close();
    localStorage.removeItem("_user");
    localStorage.removeItem("draftRaw");
    dispatch({ type: "INVALID_USER", payload: null });
  };

  return (
    <>
      <div
        className="fixed bg-white z-50 shadow-md right-16  w-56"
        onMouseLeave={close}
      >
        {isOpen ? (
          <>
            <div style={style.triangle} className="shadow-md"></div>
            <Link to="/profile">
              <Image image={profile} inner="Profile" />
            </Link>
            <Link to="/user/journey">
              <Image image={write} inner="New Journey" />
            </Link>
            <Link to="/bookmark">
              <Image image={bookmark} inner="Bookmark" />
            </Link>
            <Image
              image={logout}
              inner="Logout"
              klik={logoutAction}
              className=" border-t-2 border-gray-300"
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default DropDown;

const style = {
  triangle: {
    width: 0,
    height: 0,
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    right: "6px",
    position: "absolute",
    borderBottom: "20px solid white",
    top: "-15px",

    boxShadow: "0px 20px 4px rgba(0, 0, 0, 0), 4px 4px 20px rgba(0, 0, 0, 0)",
  } as CSSProperties,
};
