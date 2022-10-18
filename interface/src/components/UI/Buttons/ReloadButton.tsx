import React from "react";

import { useNavigate } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

const ReloadButton: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <IoReload
      className={twMerge(
        `transition-all text-white hover:opacity-50 text-4xl cursor-pointer ${className}`
      )}
      onClick={() => navigate(0)}
    />
  );
};

export default ReloadButton;
