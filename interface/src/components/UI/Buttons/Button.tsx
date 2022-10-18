import React from "react";

import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({
  className,
  type = "button",
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        `text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ${className}`
      )}
    >
      {children}
    </button>
  );
};

export default Button;
