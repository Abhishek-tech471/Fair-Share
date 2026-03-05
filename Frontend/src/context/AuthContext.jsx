import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const MOCK_USER = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: null,
  currency: 'USD',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('fairshare_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setUser(MOCK_USER);
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    // Mock login
    const mockToken = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('fairshare_token', mockToken);
    setToken(mockToken);
    setUser(MOCK_USER);
    return { success: true };
  };

  const signup = async (name, email, password) => {
    const mockToken = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('fairshare_token', mockToken);
    setToken(mockToken);
    setUser({ ...MOCK_USER, name, email });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('fairshare_token');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};

export default AuthContext;
