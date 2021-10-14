import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import leaf from "../assets/leaf.svg";
import maps from "../assets/maps.svg";
import FormInput from "../components/formInput";
import Modal from "../components/modal";
import { API } from "../config/axios";
import returnError from "../util/errorMsg";
import { FormProps } from "./login";

const Register: FC<FormProps> = ({ isOpen, close, switchModal }) => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submit = async () => {
      try {
        await API.post("register", user);
        setMessage("successful registration, please login...");
        setTimeout(() => switchModal(), 2000);
      } catch (error) {
        let msg = returnError(error);
        setMessage(msg);
      }
    };
    submit();
  };
  return (
    <>
      {isOpen ? (
        <Modal custom="">
          <form className="mb-2 mt-2" onSubmit={handleSubmit}>
            <p className="text-center mb-5 font-bold text-3xl">Register</p>
            <p className="text-red-500"> {message}</p>

            <div>
              <img src={leaf} className="absolute right-0 top-0 h-1/5" />
              <img src={maps} className="absolute left-0 top-0 h-1/5" />
              <FormInput type="text" field="fullname" onChange={handleChange} />
              <FormInput type="email" field="email" onChange={handleChange} />
              <FormInput
                type="password"
                field="password"
                onChange={handleChange}
              />

              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Address
                </label>
                <textarea
                  name="address"
                  id="address"
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, address: e.target.value }))
                  }
                  className="w-full px-3 py-2  placeholder-gray-300 border border-red-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>

              <FormInput type="number" field="phone" onChange={handleChange} />
            </div>

            <div className="mb-6 text-center">
              <button
                type="submit"
                className="w-10/12 px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
              >
                Register
              </button>
            </div>
            <p className="text-sm text-center text-gray-400 r">
              have an account yet?
              <button
                onClick={switchModal}
                className="font-semibold text-indigo-500 cursor-pointer focus:text-indigo-600 focus:outline-none focus:underline"
              >
                Login
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
export default Register;
