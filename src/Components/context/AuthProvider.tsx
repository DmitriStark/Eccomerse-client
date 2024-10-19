// import React, { createContext, useState, ReactNode } from "react";

// // Define AuthState and AuthContext types
// interface AuthState {
//     pwd: string | null; // Password is not stored, should be null or omitted in most cases
//     roles: string[] | null;
//     accessToken: string | null;
//     email: string | null; // Make email nullable for better initialization
// }

// interface AuthContextType {
//     auth: AuthState;
//     setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
// }

// // Create the context with a default value
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // AuthProvider component
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//     const [auth, setAuth] = useState<AuthState>({
//         pwd: null, // Initialize pwd as null
//         roles: null,
//         accessToken: null,
//         email: null, // Initialize email as null
//     });

//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use AuthContext


// export default AuthContext;

import React, { createContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";

// Define AuthState and AuthContext types
interface AuthState {
    pwd: string | null; // Password is not stored, should be null or omitted in most cases
    roles?: string[] | null; // Roles are optional
    accessToken: string | null;
    email: string | null; // Make email nullable for better initialization
}

interface AuthContextType {
    auth: AuthState;
    setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
    resetInactivityTimer: () => void; // Function to reset inactivity timer
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthState>({
        pwd: null,
        roles: null,
        accessToken: null,
        email: null,
    });

    const inactivityDuration = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    const inactivityTimeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null); // Use ref to store timeout ID

    // Function to reset inactivity timer
    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimeoutIdRef.current) {
            clearTimeout(inactivityTimeoutIdRef.current); // Clear existing timeout if it exists
        }

        // Set a new timeout to log the user out after inactivity duration
        inactivityTimeoutIdRef.current = setTimeout(() => {
            setAuth({
                pwd: null,
                roles: null,
                accessToken: null,
                email: null,
            });
            // Clear sessionStorage after timeout
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("roles");
        }, inactivityDuration);
    }, [inactivityDuration]); // Depend only on inactivityDuration

    // Load authentication data from sessionStorage when the component mounts
    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        const storedToken = sessionStorage.getItem("accessToken");
        const storedRoles = sessionStorage.getItem("roles");

        if (storedEmail && storedToken) {
            try {
                setAuth({
                    email: storedEmail,
                    accessToken: storedToken,
                    roles: storedRoles ? JSON.parse(storedRoles) : null,
                    pwd: null, // Don't store password
                });
                resetInactivityTimer(); // Start the inactivity timer when loading auth data
            } catch (error) {
                console.error("Error parsing roles from sessionStorage:", error);
                setAuth({
                    email: storedEmail,
                    accessToken: storedToken,
                    roles: null,
                    pwd: null, // Don't store password
                });
            }
        }
    }, [resetInactivityTimer]); // Keep resetInactivityTimer here

    // Save auth data to sessionStorage whenever auth state changes
    useEffect(() => {
        if (auth.accessToken) {
            sessionStorage.setItem("email", auth.email || "");
            sessionStorage.setItem("accessToken", auth.accessToken);
            if (auth.roles) {
                sessionStorage.setItem("roles", JSON.stringify(auth.roles));
            } else {
                sessionStorage.removeItem("roles");
            }
        } else {
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("roles");
        }
    }, [auth]); // Only depend on auth

    // Reset inactivity timer on user interaction
    useEffect(() => {
        const handleActivity = () => resetInactivityTimer(); // Reset timer on user activity

        // Listen for user activity events
        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);
        window.addEventListener("click", handleActivity);
        window.addEventListener("scroll", handleActivity);
        
        // Cleanup event listeners on unmount
        return () => {
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("keydown", handleActivity);
            window.removeEventListener("click", handleActivity);
            window.removeEventListener("scroll", handleActivity);
        };
    }, [resetInactivityTimer]); // Keep resetInactivityTimer here

    return (
        <AuthContext.Provider value={{ auth, setAuth, resetInactivityTimer }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
