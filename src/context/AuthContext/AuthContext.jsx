import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const token = accessToken || localStorage.getItem("accessToken");
  //   console.log(user) ;
  //   if (token) {
  //     setAccessToken(token);
  //   }
  // }, [accessToken, user]);
  const login = async (credentials) => {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  
    const result = await response.json();
    console.log(result.user) ;
    console.log(response) ;
  
    if (response.ok) {
      localStorage.setItem("accessToken", result.accessToken);
      setAccessToken(result.accessToken);

      await setUser(result.user) ;
    }
  
    return result;
  };

  const logout = async () => {
    console.log("logged out");
    localStorage.removeItem('accessToken') ;

    try {
      await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(error.message);
    }

    setAccessToken(null);
    setUser(null);
  };

  const refreshAccessToken = async () => {
    console.log("Access Token Refreshed");

    try {
      const response = await fetch("http://localhost:3000/api/users/refresh", {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setAccessToken(result.accessToken);

      return result.accessToken;
    } catch (error) {
      setAccessToken(null);
      setUser(null);

      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        login,
        logout,
        refreshAccessToken,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
