import { createContext, useMemo } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export const BASEURL = "http://localhost:3001/api/";

const AxiosContext = createContext();

const AxiosProvider = ({ children }) => {
  const [cookies] = useCookies(["authToken"]);

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: BASEURL,
    });

    instance.interceptors.request.use(
      (config) => {
        const authToken = cookies.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return instance;
  }, [cookies.authToken]);

  const signup = async (url, data, config = {}) => {
    return await axiosInstance.post(url, data, config);
  };

  const login = async (url, data, config = {}) => {
    return await axiosInstance.post(url, data, config);
  };

  return (
    <AxiosContext.Provider value={{ login, signup }}>
      {children}
    </AxiosContext.Provider>
  );
};

export { AxiosContext, AxiosProvider };
