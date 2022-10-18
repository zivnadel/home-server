import React from "react";
import { useNavigate } from "react-router-dom";

import {
  AiFillFolderOpen,
  AiFillFolder,
  AiFillFolderAdd,
  AiFillFileAdd,
  AiFillDelete,
} from "react-icons/ai";
import { FaCloudDownloadAlt } from "react-icons/fa";
import DeleteModal from "../UI/Modals/DeleteModal";

interface Props {
  name: string;
  path: string;
  root: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<string[]>>;
  initialCollapsed: boolean;
}

const Folder: React.FC<Props> = ({
  name,
  path,
  setCollapsed,
  initialCollapsed,
  root,
}) => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const [collapseIcon, setCollapseIcon] = React.useState(initialCollapsed);

  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      if (prev.includes(path)) {
        return prev.filter((p) => p !== path);
      } else {
        return [...prev, path];
      }
    });
    setCollapseIcon((prev) => !prev);
  };

  const showModal = () => {
    setShowDeleteModal(true);
  };

  const uploadFile = async () => {
    await window.electron.selectAndSendFiles(
      path,
      `${localStorage.getItem("SERVER_URL")}:${localStorage.getItem(
        "SERVER_PORT"
      )}`
    );

    navigate("/");
  };

  const createFolder = async () => {
    await window.electron.selectAndSendFolder(
      path,
      `${localStorage.getItem("SERVER_URL")}:${localStorage.getItem(
        "SERVER_PORT"
      )}`
    );
  };

  const downloadFolder = async () => {
    await window.electron.downloadFolder(
      `${localStorage.getItem("SERVER_URL")}:${localStorage.getItem(
        "SERVER_PORT"
      )}`,
      path
    );
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteModal setShowModal={setShowDeleteModal} path={path} />
      )}
      <li className="text-white">
        {collapseIcon ? (
          <AiFillFolder
            onClick={toggleCollapse}
            className={`${
              root ? "text-orange-700" : "text-primary"
            } cursor-pointer hover:opacity-60 inline mr-1`}
          />
        ) : (
          <AiFillFolderOpen
            onClick={toggleCollapse}
            className={`${
              root ? "text-orange-700" : "text-primary"
            } cursor-pointer hover:opacity-60 inline mr-1`}
          />
        )}
        <span className="bg-gray-600 rounded-lg px-1">
          {name === "root" ? "שרת הקבצים" : name}
        </span>
        <AiFillFolderAdd
          onClick={createFolder}
          className="cursor-pointer hover:opacity-60 inline ml-2 text-emerald-600"
        />
        <AiFillFileAdd
          onClick={uploadFile}
          className="cursor-pointer hover:opacity-60 inline ml-1 text-emerald-600"
        />
        <FaCloudDownloadAlt
          onClick={downloadFolder}
          className="cursor-pointer hover:opacity-60 inline ml-1 text-gray-400"
        />
        {!root && (
          <AiFillDelete
            onClick={showModal}
            className="hover:opacity-60 cursor-pointer inline ml-1 text-red-800"
          />
        )}
      </li>
    </>
  );
};

export default Folder;
