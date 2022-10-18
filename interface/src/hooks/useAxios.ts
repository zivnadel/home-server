import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAxios = (reloadOnFinish: boolean = false) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const activeRequest = React.useRef<AbortController[]>([]);

  const sendRequest = React.useCallback(
    async <DataType>(
      url: string,
      method: string = "GET",
      data?: any,
      headers?: any
    ) => {
      setIsLoading(true);
      const abortController = new AbortController();
      activeRequest.current.push(abortController);

      try {
        const response = await axios.request<DataType>({
          url,
          method,
          data,
          headers,
          signal: abortController.signal,
        });

        activeRequest.current = activeRequest.current.filter(
          (reqCtrl) => reqCtrl !== abortController
        );

        if (reloadOnFinish) {
          navigate(0);
        }

        return response.data;
      } catch (err: any) {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(err.message || "משהו השתבש, נסה שוב מאוחר יותר");
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError("");
  };

  React.useEffect(() => {
    return () => {
      activeRequest.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};

export default useAxios;
