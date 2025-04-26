import { createContext, useState } from 'react';
import { AuthType } from '../types/AuthType';

interface AuthContextType {
  auth: AuthType | null;
  HandleContextAuthenticate: () => void;
  HandleContextlogin: (data: AuthType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  return (
    <AuthContext.Provider value={{ auth, HandleContextAuthenticate, HandleContextlogin }}>
      {children}
    </AuthContext.Provider>
  );
};

