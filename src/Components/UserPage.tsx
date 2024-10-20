// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { serverHost } from "./constants";
// import "../css/UserPage.css";
// import AuthContext from "./context/AuthProvider";

// interface UserData {
//   name: string;
//   age: number;
//   // Add other properties as needed
// }

// const UserPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [user, setUser] = useState<UserData | null>(null);
  
//   const authContext = useContext(AuthContext);
//   const { auth, loading } = authContext; // Destructure loading from context
//   const token = auth.accessToken;
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const apiUrl = `${serverHost}/users`;
//         const response = await fetch(`${apiUrl}/${id}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Attach JWT token here
//           },
//         });        const userData: UserData = await response.json();
//         setUser(userData);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [id, token]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//   <div className="user-container">
//     <div className="user-page">
//       <h2>User Page</h2>
//       <p>User ID: {id}</p>
//       <p>Name: {user.name}</p>
//       <p>Age: {user.age}</p>
//       {/* Display other user details here */}
//     </div>
//     </div>
//   );
// };

// export default UserPage;


import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverHost } from "./constants";
import "../css/UserPage.css";
import AuthContext from "./context/AuthProvider";

interface UserData {
  name: string;
  age: number;
  // Add other properties as needed
}

const UserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const { auth, loading } = authContext; // Destructure loading from context
  const token = auth?.accessToken; // Ensure auth exists before accessing token

  useEffect(() => {
    const fetchUserData = async () => {
      // Exit early if token is not available
      if (!token) {
        setError("You need to log in to see user details...");
        return;
      }

      try {
        const apiUrl = `${serverHost}/users`;
        const response = await fetch(`${apiUrl}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach JWT token here
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            setError("You need to log in to see user details...");
          } else {
            setError("Error fetching user data.");
          }
          return;
        }

        const userData: UserData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data.");
      }
    };

    // Only fetch data if loading is false and token is present
    if (!loading) {
      fetchUserData();
    }
  }, [id, token, loading]); // Depend on id, token, and loading

  if (loading) {
    return <div className="loading">Loading authentication...</div>; // Show loading message while waiting for token
  }

  if (error) {
    return <div className="error">{error}</div>; // Show error message
  }

  if (!user) {
    return <div className="loading">Loading user data...</div>; // Show loading message while fetching user data
  }

  return (
    <div className="user-container">
      <div className="user-page">
        <h2>User Page</h2>
        <p>User ID: {id}</p>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        {/* Display other user details here */}
      </div>
    </div>
  );
};

export default UserPage;
