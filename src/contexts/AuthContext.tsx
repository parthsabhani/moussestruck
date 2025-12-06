import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('moussestruck_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Get existing users from localStorage
      const usersJSON = localStorage.getItem('moussestruck_users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];

      // Check if email already exists
      const emailExists = users.some((u: any) => u.email === userData.email);
      if (emailExists) {
        alert('Email already registered. Please login instead.');
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
      };

      // Store password separately (in production, this should be hashed on backend)
      const userWithPassword = {
        ...newUser,
        password: userData.password,
      };

      // Save to users array
      users.push(userWithPassword);
      localStorage.setItem('moussestruck_users', JSON.stringify(users));

      // Auto-login after registration
      setUser(newUser);
      localStorage.setItem('moussestruck_user', JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const usersJSON = localStorage.getItem('moussestruck_users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];

      // Find user with matching email and password
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!foundUser) {
        alert('Invalid email or password');
        return false;
      }

      // Remove password from user object before storing in state
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('moussestruck_user', JSON.stringify(userWithoutPassword));

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('moussestruck_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
