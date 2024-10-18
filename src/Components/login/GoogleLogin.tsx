import React, { useState } from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google"; // Import CredentialResponse
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  name: string;
  email: string;
  picture: string;
  exp: number; // To handle token expiration
}

const Login: React.FC = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) { // Check if credential exists
      try {
        setLoading(true); // Start loading
        const credentialResponseDecoded = jwtDecode<DecodedToken>(
          credentialResponse.credential
        );
        console.log("Decoded Token:", credentialResponseDecoded,credentialResponseDecoded.name);
        setUser(credentialResponseDecoded);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Failed to decode token:", error);
        setError("Failed to decode token. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      setError("No credential found.");
    }
  };

  const handleError = () => {
    setError("Login Failed. Please try again.");
  };

  const handleLogout = () => {
    setUser(null);
    setError(null);
  };

  const isTokenExpired = (exp: number): boolean => {
    const currentTime = Date.now() / 1000; // Current time in seconds
    return exp < currentTime;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login with Google</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!user ? (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      ) : (
        <div>
          <h3>Welcome, {user.name}!</h3>
          <img src={user.picture} alt={user.name} style={{ borderRadius: "50%" }} />
          <p>Email: {user.email}</p>
          {isTokenExpired(user.exp) ? (
            <p style={{ color: "red" }}>Your session has expired. Please log in again.</p>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;



