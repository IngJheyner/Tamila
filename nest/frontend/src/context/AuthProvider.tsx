import { createContext, useState } from 'react';
import { AuthType } from '../types/AuthType';

export interface AuthContextType {
  auth: AuthType | null;
  HandleContextAuthenticate: () => void;
  HandleContextlogin: (data: AuthType) => void;
  HandleContextlogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  HandleContextAuthenticate: () => {},
  HandleContextlogin: () => {},
  HandleContextlogout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [recipesFalitesId, setRecipesFalitesId] = useState<boolean>(
    (localStorage.getItem('auth') !== null) ? true : false
  );
  const [auth, setAuth] = useState<AuthType | null>(null);

  const HandleContextAuthenticate = () => {
    if(!recipesFalitesId && localStorage.getItem('auth') === null) {
      window.location.href = '/login';
    }
    setRecipesFalitesId(true);
  }

  const HandleContextlogin = async (data: AuthType) => {
    const { id, name, token } = data;
    localStorage.setItem('auth', JSON.stringify({ id, name, token }));
    setAuth(data);
  };

  const HandleContextlogout = () => {
    localStorage.removeItem('auth');
    setAuth(null);
  }

  return (
    <AuthContext.Provider value={{ auth, HandleContextAuthenticate, HandleContextlogin, HandleContextlogout }}>
      {children}
    </AuthContext.Provider>
  );
};

