import React, { MouseEvent } from "react";
import { DataJourney } from "../types/response";
import Modal from "./modal";

const ModalConfirm = ({
  open,
  close,
  remove,
  item,
}: {
  open: boolean;
  close: (e: MouseEvent<HTMLButtonElement>) => void;
  remove?: (id: number, e: MouseEvent<HTMLButtonElement>) => void;
  item: DataJourney;
}) => {
  return (
    <>
      {open ? (
        <Modal key={item.id}>
          <div className="mx-auto flex-shrink-0 flex items-center  h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
          <div className="mt-3 text-center items-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              delete journey {item.title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                are you sure to delete this post? All of your data will be
                permanently removed. This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 mx-auto mt-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={remove ? (e) => remove(item.id, e) : () => {}}
            >
              {/* {console.log(item.id, "testt")} */}
              Delete
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={close}
            >
              Cancel
            </button>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};
export default ModalConfirm;
