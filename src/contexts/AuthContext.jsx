import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Senha do admin — altere aqui para a senha desejada
const ADMIN_PASSWORD = 'horizonte2026';

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  // Restaurar sessão ativa
  useEffect(() => {
    const session = sessionStorage.getItem('horizonte_admin');
    if (session === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem('horizonte_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('horizonte_admin');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
