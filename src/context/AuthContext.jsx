import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import env from "../config/env.js";

const userContext = createContext();

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyUser = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");

      if (token && userId) {
        const response = await axios.get(
          `${env.BE_API_PATH}/User/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setUser(response.data);
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    } catch (error) {
      if (error.response?.data) {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = () => {
    verifyUser()
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-blue-600">
            Đang tải thông tin người dùng...
          </p>
        </div>
      ) : (
        children
      )}
    </userContext.Provider>
  );
}

export const useAuth = () => useContext(userContext);
export default AuthContext;
