import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(backendUrl + "/api/user/signup", {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));

      dispatch({ type: "LOGIN", payload: response.data });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { signup, isLoading, error };
};
