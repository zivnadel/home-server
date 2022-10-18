import React from "react";

import DirTree from "./components/DirectoryTree/DirTree";
import useAxios from "./hooks/useAxios";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import ErrorAlert from "./components/UI/Modals/ErrorAlert";
import ReloadButton from "./components/UI/Buttons/ReloadButton";

const Home = () => {
  const [dirTree, setDirTree] = React.useState<any>(null);

  const { isLoading, error, sendRequest, clearError } = useAxios();

  React.useEffect(() => {
    sendRequest(`${window.SERVER_URL}:${window.SERVER_PORT}`).then((res) => {
      setDirTree(res);
    });
  }, [sendRequest]);

  return (
    <>
      <ReloadButton className="fixed right-[4.3rem] top-[1.15rem]" />
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
