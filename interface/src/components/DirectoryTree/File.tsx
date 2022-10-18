import React from "react";

import {
  AiFillFile,
  AiFillFileImage,
  AiFillVideoCamera,
  AiFillDelete,
} from "react-icons/ai";
import { FaCloudDownloadAlt } from "react-icons/fa";
import DeleteModal from "../UI/Modals/DeleteModal";

interface Props {
  name: string;
  extension: string;
  path: string;
}

const File: React.FC<Props> = ({ name, extension, path }) => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const downloadFile = async () => {
    await window.electron.downloadFile(
      `${localStorage.getItem("SERVER_URL")}:${localStorage.getItem(
        "SERVER_PORT"
      )}`,
      path
    );
  };

  const showModal = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteModal setShowModal={setShowDeleteModal} path={path} />
      )}
      <li key={name} className="text-white">
        {[".jpg", ".jpeg", ".png", ".gif"].includes(extension) ? (
          <AiFillFileImage className="inline mr-1 text-yellow-600" />
        ) : [".mp4", ".mov", ".wmv", ".avi"].includes(extension) ? (
          <AiFillVideoCamera className="inline mr-1 text-purple-700" />
        ) : (
          <AiFillFile className="inline mr-1 text-secondary" />
        )}
        {name}
        <FaCloudDownloadAlt
          onClick={downloadFile}
          className="hover:opacity-60 cursor-pointer inline ml-1 text-gray-400"
        />
        <AiFillDelete
          onClick={showModal}
          className="hover:opacity-60 cursor-pointer inline ml-1 text-red-800"
        />
      </li>
    </>
  );
};

export default File;
