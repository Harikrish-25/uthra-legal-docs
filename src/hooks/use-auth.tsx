import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

interface User {
  id: string;
  username: string;
  role: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, confirmPassword: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  getAllUsers: () => User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin user
const DEFAULT_USERS = [
  { id: "1", username: "admin", password: "admin123", role: "admin", createdAt: new Date().toISOString() },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load users from localStorage or use default
  const getStoredUsers = () => {
    try {
      const stored = localStorage.getItem("uthra-users");
      return stored ? JSON.parse(stored) : DEFAULT_USERS;
    } catch (error) {
      console.error("Error loading users:", error);
      return DEFAULT_USERS;
    }
  };

  const saveUsers = (users: any[]) => {
    try {
      localStorage.setItem("uthra-users", JSON.stringify(users));
    } catch (error) {
      console.error("Error saving users:", error);
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const token = Cookies.get("auth-token");
    const userData = Cookies.get("user-data");
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        Cookies.remove("auth-token");
        Cookies.remove("user-data");
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (username: string, password: string, confirmPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Validation
      if (password !== confirmPassword) {
        return { success: false, message: "Passwords do not match" };
      }

      if (password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters" };
      }

      if (username.length < 3) {
        return { success: false, message: "Username must be at least 3 characters" };
      }

      // Check if username already exists
      const users = getStoredUsers();
      const existingUser = users.find((u: any) => u.username.toLowerCase() === username.toLowerCase());
      
      if (existingUser) {
        return { success: false, message: "Username already exists" };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username: username.trim(),
        password: password,
        role: "user",
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);

      return { success: true, message: "Account created successfully! You can now login." };

    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Registration failed. Please try again." };
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const users = getStoredUsers();
      const foundUser = users.find(
        (u: any) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        const token = `token_${Date.now()}_${Math.random()}`;
        
        // Store in cookies (expires in 24 hours)
        Cookies.set("auth-token", token, { expires: 1 });
        Cookies.set("user-data", JSON.stringify(userWithoutPassword), { expires: 1 });
        
        setUser(userWithoutPassword);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    Cookies.remove("auth-token");
    Cookies.remove("user-data");
    setUser(null);
  };

  const getAllUsers = (): User[] => {
    const users = getStoredUsers();
    return users.map(({ password: _, ...user }: any) => user);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading,
    getAllUsers,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};