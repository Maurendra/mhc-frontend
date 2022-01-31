import React from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = React.useState(null);
  const [isProcess, setIsProcess] = React.useState(true);

  const getAuthState = async () => {
    try {
      const authString = await localStorage.getItem("auth");
      setAuthState(JSON.parse(authString));
    } catch (err) {
      setAuthState(null);
    }
    setIsProcess(false);
  };

  const setAuth = async (auth) => {
    setAuthState(auth);
    localStorage.setItem("auth", JSON.stringify(auth));
  };

  const deleteAuth = async () => {
    try {
      localStorage.clear();
      setAuthState(null);
    } catch (error) {
      Promise.reject(error);
    }
  };

  React.useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        deleteAuth,
      }}
    >
      {!isProcess ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
