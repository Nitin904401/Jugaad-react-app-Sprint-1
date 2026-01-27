import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getMe, loginUser, logoutUser, registerUser } from "../api/auth";

type Role = "customer" | "vendor" | "admin";

interface User {
  id: string;
  name?: string;
  email?: string;
  phone_number?: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: { name: string; email: string; password: string; role: Role }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => {
        // User is not authenticated, which is fine
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const user = await loginUser({ email, password });
    setUser(user);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const register = async (data: { name: string; email: string; password: string; role: Role }) => {
    const user = await registerUser(data);
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout,
      register,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
