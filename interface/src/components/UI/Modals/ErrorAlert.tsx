import React from "react";

import { AiFillCloseCircle, AiFillAlert } from "react-icons/ai";

interface Props {
  onDismiss: () => void;
}

const ErrorAlert: React.FC<Props> = ({ onDismiss }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
        <AiFillCloseCircle
          onClick={onDismiss}
          className="cursor-pointer hover:opacity-70 text-xl mr-6"
        />
        <div>
          <span className="font-medium">אירעה שגיאה!</span> נסה שנית מאוחר יותר
        </div>
        <AiFillAlert className="text-xl ml-3" />
      </div>
    </div>
  );
};

export default ErrorAlert;
