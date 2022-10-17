import React from "react";

import {
  AiFillFolderOpen,
  AiFillFolder,
  AiFillFolderAdd,
  AiFillFileAdd,
} from "react-icons/ai";
import { FaCloudDownloadAlt } from "react-icons/fa";

interface Props {
  name: string;
  path: string;
  setCollapsed: React.Dispatch<React.SetStateAction<string[]>>;
}

const Folder: React.FC<Props> = ({ name, path, setCollapsed }) => {
  const [collapseIcon, setCollapseIcon] = React.useState(false);

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

  const createFile = () => {
    console.log(path);
  };

  const createFolder = () => {
    console.log(path);
  };

  return (
    <li className="text-white">
      {collapseIcon ? (
        <AiFillFolder
          onClick={toggleCollapse}
          className="cursor-pointer hover:opacity-60 inline mr-1 text-primary"
        />
      ) : (
        <AiFillFolderOpen
          onClick={toggleCollapse}
          className="cursor-pointer hover:opacity-60 inline mr-1 text-primary"
        />
      )}
      <span className="bg-gray-600 rounded-lg px-1">{name}</span>
      <AiFillFolderAdd
        onClick={createFolder}
        className="cursor-pointer hover:opacity-60 inline ml-2 text-red-600"
      />
      <AiFillFileAdd
        onClick={createFile}
        className="cursor-pointer hover:opacity-60 inline ml-1 text-red-600"
      />
      <FaCloudDownloadAlt className="cursor-pointer hover:opacity-60 inline ml-1 text-gray-400" />
    </li>
  );
};

export default Folder;
