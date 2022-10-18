import React from "react";

import { FaServer } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Button from "./components/UI/Buttons/Button";

import Input from "./components/UI/Input";

const Settings = () => {
  const [serverUrl, setServerUrl] = React.useState("");
  const [serverPort, setServerPort] = React.useState("");

  const navigate = useNavigate();

  const serverUrlChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setServerUrl(event.target.value);
  };

  const serverPortChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setServerPort(event.target.value);
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    window.SERVER_URL = serverUrl || window.SERVER_URL;
    window.SERVER_PORT = serverPort || window.SERVER_PORT;

    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex items-start justify-center">
      <form
        onSubmit={submitHandler}
        className="mt-24 flex flex-col m-2 items-center"
      >
        <div className="flex">
          <Input
            label="כתובת השרת"
            required
            icon={<FaServer />}
            initialValue={window.SERVER_URL}
            value={serverUrl}
            onChange={serverUrlChangedHandler}
          />
          <span className="text-light text-4xl mt-6 mr-5 ml-5">:</span>
          <Input
            label="פורט"
            required
            icon={<FaServer />}
            initialValue={window.SERVER_PORT}
            value={serverPort}
            onChange={serverPortChangedHandler}
          />
        </div>
        <Button type="submit">החל</Button>
      </form>
    </div>
  );
};

export default Settings;