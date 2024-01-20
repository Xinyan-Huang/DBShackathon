import React, { useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();
const AuthLogoutContext = React.createContext();

export const useAuth = () => useContext(AuthContext);
export const useAuthUpdate = () => useContext(AuthUpdateContext);
export const useAuthLogout = () => useContext(AuthLogoutContext);

const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(() => localStorage.getItem('jwtToken'));

  const updateToken = useCallback((newToken) => {
    localStorage.setItem('jwtToken', newToken);
    setJwtToken(newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('jwtToken');
    sessionStorage.removeItem('jwtToken');
    setJwtToken(null);
  }, []);

  useEffect(() => {
    // Optional: Token validation or decoding logic can go here
  }, [jwtToken]);

  return (
    <AuthContext.Provider value={jwtToken}>
      <AuthUpdateContext.Provider value={updateToken}>
        <AuthLogoutContext.Provider value={logout}>
          {children}
        </AuthLogoutContext.Provider>
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
