import React, { FC, MouseEvent, useContext, useEffect, useState } from "react";
import icon from "../assets/bookmark.svg";
import iconBookmark from "../assets/bookmarkhover.svg";
import defaultView from "../assets/default.png";
import Loading from "./loading";
import ModalConfirm from "./confirmModal";
import { DataJourney } from "../types/response";
import histoPng from "../assets/empty.png";
import { UserContext } from "../context/provider";

interface CardProps {
  data: DataJourney[];
  clickDetail: (id: number, data: DataJourney) => void;
  bookMarkId?: number[];
  addBookmark?: (id: number, e: MouseEvent<HTMLDivElement>) => void;
  icond?: string;
  isOpen?: boolean;
  remove?: (id: number, e: MouseEvent<HTMLButtonElement>) => void;
  openModal?: (e: MouseEvent<HTMLDivElement>) => void;
  close?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Card: FC<CardProps> = ({
  data,
  clickDetail,
  bookMarkId,
  addBookmark,
  icond,
  remove,
  openModal,
  isOpen,
  close,
}) => {
  const [id, setId] = useState<DataJourney | null>(null);
  const { state } = useContext(UserContext);
  const openModalConfirm = (id: DataJourney, e: MouseEvent<HTMLDivElement>) => {
    setId(id);
    openModal && openModal(e);
  };

  return (
    <>
      {id ? (
        <ModalConfirm
          item={id}
          open={isOpen || false}
          remove={remove}
          close={close ? close : () => {}}
        />
      ) : (
        <></>
      )}
      {data.length ? (
        <div className="sm:grid sm:grid-cols-2  mb-36 overflow-hidden lg:grid-cols-4 gap-10 space-y-4 sm:space-y-0">
          {data.map((item, index) => {
            return (
              <div
                className="bg-white  cursor-pointer  "
                key={item.id}
                onClick={() => clickDetail(item.id, item)}
              >
                <div>
                  <div className="shadow-lg hover:shadow-xl  transform transition h-96 duration-500 hover:scale-105">
                    <div
                      onClick={
                        addBookmark ? (e) => addBookmark(item.id, e) : () => {}
                      }
                      className="bg-white absolute w-10 h-10 right-2 top-2 flex items-center  rounded-full border border-indigo-500 text-indigo-500   transition duration-500 ease select-none hover:text-white hover:bg-yellow-200 focus:outline-none focus:shadow-outline"
                    >
                      {(icond && remove) || (icond && addBookmark) ? (
                        <img
                          src={icond}
                          alt=""
                          className="mx-auto object-contain"
                          onClick={(e) => openModalConfirm(item, e)}
                        />
                      ) : (
                        <img
                          src={
                            bookMarkId &&
                            bookMarkId.includes(item.id) &&
                            state.isLogin
                              ? iconBookmark
                              : icon
                          }
                          alt=""
                          className="mx-auto object-contain"
                        />
                      )}
                    </div>
                    <div>
                      <img
                        className="w-full h-48 object-cover"
                        src={item.img_cover ? item.img_cover : defaultView}
                      />
                      <div className="px-4 py-2">
                        <h1 className="text-xl font-gray-700 font-bold">
                          {item.title}
                        </h1>
                        <div className="flex space-x-2 mt-2">
                          <h3 className="text-sm text-gray-600 font-light mb-2">
                            {new Date(item?.createdAt).toDateString()}{" "}
                            {item.user?.fullname}
                          </h3>
                        </div>
                        <p className="text-sm tracking-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center flex flex-col w-full items-center mb-10">
          <img src={histoPng} alt="" className="h-64" />
          <p className="text-yellow-800 text-2xl font-semibold"> Empty List </p>
        </div>
      )}
    </>
  );
};

export default Card;
