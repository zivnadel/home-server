import React from "react";
import ReactDOM from "react-dom";

import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";

import Button from "../Buttons/Button";
import Input from "../Input";
import useAxios from "../../../hooks/useAxios";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  path: string;
}

const DeleteModal: React.FC<Props> = ({ setShowModal, path }) => {
  const { isLoading, error, sendRequest, clearError } = useAxios();

  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const dismissHandler = () => {
    setShowModal(false);
  };

  const deleteHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    sendRequest(
      `${localStorage.getItem("SERVER_URL")}:${localStorage.getItem(
        "SERVER_PORT"
      )}`,
      "DELETE",
      {
        path,
      },
      {
        Authorization: `Bearer ${password}`,
      }
    ).then(() => {
      if (!error) {
        navigate(0);
      }
    });
  };

  const passwordChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    clearError();
  };

  return ReactDOM.createPortal(
    <div className="z-30 flex fixed w-screen h-screen items-center justify-center bg-dark/60">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={dismissHandler}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <form onSubmit={deleteHandler} className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              האם אתה בטוח שברצונך למחוק קובץ זה? הקש סיסמא לאישור
            </h3>
            <Input
              error={error}
              value={password}
              onChange={passwordChangedHandler}
              required
              type="password"
              icon={<RiLockPasswordFill />}
            />
            <Button
              type="submit"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              אישור
            </Button>
            <Button
              onClick={dismissHandler}
              type="button"
              className="bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              ביטול
            </Button>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("_modals")
  );
};

export default DeleteModal;
