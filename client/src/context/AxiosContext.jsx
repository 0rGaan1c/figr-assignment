import { createContext, useMemo } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export const BASEURL = "http://localhost:3001/api/";

const AxiosContext = createContext();

const AxiosProvider = ({ children }) => {
  const [cookies, , removeCookie] = useCookies(["authToken"]);

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

  const getUserProjects = async (url, config = {}) => {
    return await axiosInstance.get(url, config);
  };

  const createProject = async (url, data, config = {}) => {
    return await axiosInstance.post(url, data, config);
  };

  const getProjectById = async (url, config = {}) => {
    return await axiosInstance.get(url, config);
  };

  const logout = () => {
    removeCookie("authToken", { path: "/" });
    localStorage.removeItem("user");
  };

  return (
    <AxiosContext.Provider
      value={{
        login,
        signup,
        getUserProjects,
        createProject,
        logout,
        getProjectById,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

export { AxiosContext, AxiosProvider };
