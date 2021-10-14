import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Icon.svg";
import logo2 from "../assets/Icon1.svg";
import { EventContext, UserContext } from "../context/provider";
import Login from "../modal/login";
import Register from "../modal/register";
import profile from "../assets/profile.png";
import DropDown from "./dropdown";
import Button from "./button";

const Header = () => {
  const { eventState, eventDispatch } = useContext(EventContext);
  const { state, dispatch } = useContext(UserContext);
  const [isDropDown, setDropDown] = useState(false);
  const [isHome, setHome] = useState(false);
  const history = useLocation().pathname == "/";
  const [scrool, setScrool] = useState(false);
  const switchModal = (fieldNow: string, fieldTo: string) => {
    eventDispatch({ type: fieldNow, payload: false });
    eventDispatch({ type: fieldTo, payload: true });
  };

  useEffect(() => {
    setHome(history);
  }, [history]);

  const onScrool = () => {
    if (window.scrollY > 0) {
      setScrool(false);
    } else {
      setScrool(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScrool);
  }, []);
  const toogle = () => {
    isDropDown ? setDropDown(false) : setDropDown(true);
  };

  return (
    <>
      <Login
        isOpen={eventState.login && !eventState.signin}
        close={() => eventDispatch({ type: "MODAL_LOGIN", payload: false })}
        switchModal={() => switchModal("MODAL_LOGIN", "MODAL_SIGNIN")}
      />
      <Register
        isOpen={eventState.signin && !eventState.login}
        close={() => eventDispatch({ type: "MODAL_SIGNIN", payload: false })}
        switchModal={() => switchModal("MODAL_SIGNIN", "MODAL_LOGIN")}
      />

      <div
        className={`flex justify-between z-30 fixed  shadow-lg ${
          isHome && !state.isLogin && scrool ? "" : " bg-base"
        }  w-full items-center md:px-16 sm:px-16 lg:px-16 xs:px-6 py-5`}
      >
        <img src={isHome && !state.isLogin && scrool ? logo : logo2} />
        {state.isLogin ? (
          <div onClick={toogle}>
            <img
              src={state.data?.avatar ? state.data?.avatar : profile}
              className="h-10 w-10 object-cover rounded-full"
              alt=""
              draggable={false}
            />
            <DropDown isOpen={isDropDown} close={() => setDropDown(false)} />
          </div>
        ) : (
          <div className="flex   items-center">
            <div className="  flex  w-64 justify-between   ">
              <Button
                klik={() => eventDispatch({ type: "MODAL_LOGIN" })}
                inner="login"
                color={`border-2 ${
                  !scrool
                    ? "border-blue-500 text-blue-500"
                    : " border-white text-white"
                } `}
              />
              <Button
                klik={() => eventDispatch({ type: "MODAL_SIGNIN" })}
                inner="register "
                color="bg-blue-500 text-white"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Header;
