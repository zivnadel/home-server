import React from "react";

import { AiFillFile, AiFillFileImage, AiFillVideoCamera } from "react-icons/ai";
import { FaCloudDownloadAlt } from "react-icons/fa";

interface Props {
  name: string;
  extension: string;
}

const File: React.FC<Props> = ({ name, extension }) => {
  return (
    <li key={name} className="text-white">
      {[".jpg", ".jpeg", ".png", ".gif"].includes(extension) ? (
        <AiFillFileImage className="inline mr-1 text-yellow-600" />
      ) : [".mp4", ".mov", ".wmv", ".avi"].includes(extension) ? (
        <AiFillVideoCamera className="inline mr-1 text-purple-700" />
      ) : (
        <AiFillFile className="inline mr-1 text-secondary" />
      )}
      {name}
      <FaCloudDownloadAlt className="hover:opacity-60 cursor-pointer inline ml-1 text-gray-400" />
    </li>
  );
};

export default File;
