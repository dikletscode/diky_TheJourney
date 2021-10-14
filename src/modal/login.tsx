import { AxiosError } from "axios";
import React, { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import leaf from "../assets/leaf.svg";
import maps from "../assets/maps.svg";
import FormInput from "../components/formInput";
import Modal from "../components/modal";
import { API } from "../config/axios";
import { EventContext, UserContext } from "../context/provider";
import returnError from "../util/errorMsg";

export interface FormProps {
  isOpen: boolean;
  close: () => void;
  switchModal: () => void;
}

const Login: FC<FormProps> = ({ isOpen, switchModal }) => {
  const { dispatch } = useContext(UserContext);
  const { eventDispatch } = useContext(EventContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const apiPost = async () => {
    try {
      let res = await API.post("login", user);
      dispatch({ type: "VALID_USER", payload: res.data.user });
      localStorage.setItem("_user", JSON.stringify(res.data));
      setMessage("");
      eventDispatch({ type: "CLOSE_MODAL" });
    } catch (error) {
      let msg = returnError(error);
      setMessage(msg);
      dispatch({ type: "INVALID_USER", payload: null });
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    apiPost();
  };

  return (
    <>
      {isOpen ? (
        <Modal>
          <form className="mb-4 mt-12" onSubmit={handleSubmit}>
            <p className="text-center mb-5 font-bold text-3xl">Login</p>
            <img src={leaf} className="absolute right-0 top-0 h-1/3" />
            <img src={maps} className="absolute left-0 top-0 h-1/3" />
            <FormInput type="email" field="email" onChange={handleChange} />
            <FormInput
              type="password"
              field="password"
              onChange={handleChange}
            />
            {message}
            <div className="mb-6 text-center">
              <button
                type="submit"
                className="w-10/12 px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
              >
                Login
              </button>
            </div>
            <p className="text-sm text-center text-gray-400">
              Don&#x27;t have an account yet?
              <button
                onClick={switchModal}
                className="font-semibold text-indigo-500 cursor-pointer focus:text-indigo-600 focus:outline-none focus:underline"
              >
                Register
              </button>
              .
            </p>
          </form>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};
export default Login;
