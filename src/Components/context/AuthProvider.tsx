import React, { createContext, useState, ReactNode } from "react";

// Define AuthState and AuthContext types
interface AuthState {
    pwd: string | null; // Password is not stored, should be null or omitted in most cases
    roles: string[] | null;
    accessToken: string | null;
    email: string | null; // Make email nullable for better initialization
}

interface AuthContextType {
    auth: AuthState;
    setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthState>({
        pwd: null, // Initialize pwd as null
        roles: null,
        accessToken: null,
        email: null, // Initialize email as null
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext


export default AuthContext;
