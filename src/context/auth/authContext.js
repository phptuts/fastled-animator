import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    firebaseControlled: false,
    userId: null,
    isLoggedIn: false,
  });

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      setState({
        firebaseControlled: true,
        userId: user ? user.uid : null,
        isLoggedIn: user !== null,
      });
    });
  }, []);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
