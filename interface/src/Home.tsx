import React from "react";

import axios from "axios";

import DirTree from "./components/DirectoryTree/DirTree";
import useAxios from "./hooks/useAxios";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import ErrorAlert from "./components/UI/ErrorAlert";

const Home = () => {
  const [dirTree, setDirTree] = React.useState<any>(null);

  const { isLoading, error, sendRequest, clearError } = useAxios();

  React.useEffect(() => {
    sendRequest(window.SERVER_URL, "GET").then((res) => {
      setDirTree(res);
    });
  }, [sendRequest]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner asOverlay transparent />
      ) : error ? (
        <ErrorAlert onDismiss={clearError} />
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          {dirTree && <DirTree dirTree={dirTree} />}
        </div>
      )}
    </>
  );
};

export default Home;
