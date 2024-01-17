import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(backendUrl + "/api/user/login", {
        username,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response.data));

      dispatch({ type: "LOGIN", payload: response.data });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  return { login, isLoading, error };
};
