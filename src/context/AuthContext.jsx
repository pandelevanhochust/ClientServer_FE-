import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_PATH = import.meta.env.VITE_BE_API_PATH;

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("userId");

        if (token && userId) {
          const response = await axios.get(
            `${API_PATH}/User/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            setUser(response.data);
            setLoading(false)
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
    verifyUser();
  }, []);

  useEffect(() => {
    console.log(user);  
  }, [user]);  

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
}

export const useAuth = () => useContext(userContext);
export default AuthContext;
