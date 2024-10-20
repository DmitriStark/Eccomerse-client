// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../css/Users.css";
// import AuthContext from "./context/AuthProvider";

// const host: string = import.meta.env.VITE_SERVER_URL;
// const apiUrl: string = `${host}/users`;

// interface UserData {
//   id?: string; // Assuming your user data has an ID
//   name?: string;
//   age?: number;
//   email:string,
//   username:string
// }

// const Users: React.FC = () => {
//   const [data, setData] = useState<UserData[] | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const authContext = useContext(AuthContext);
//   const token = authContext?.auth.accessToken;
//   console.log("@@@token",token)
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(apiUrl, {
//           method: "GET", // or POST, PUT, DELETE, etc.
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Attach JWT token here
//           },
//         });
//         // Check if the response is ok (status code 200-299)
//         if (!res.ok) {
//           if (res.status === 403) {
//             setError("You need to log in to see users...");
//           } else {
//             setError("Error fetching user data.");
//           }
//           return;
//         }

//         const resBody: UserData[] = await res.json();
//         setData(resBody);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setError("Error fetching user data.");
//       }
//     };

//     fetchData();
//   }, [token]);

//   if (error) {
//     return <div className="loading">{error}</div>;
//   }

//   if (!data) {
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <div className="users">
//       {data.map((user) => (
//         <Link key={user.id} to={`/user/${user.id}`} className="user-link">
//           <div className="user">
//             <h2>{user.name}</h2>
//             <p>{`Age: ${user.age}`}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default Users;


import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Users.css";
import AuthContext from "./context/AuthProvider";

const host = import.meta.env.VITE_SERVER_URL;
const apiUrl = `${host}/users`;

interface UserData {
  id?: string; // Assuming your user data has an ID
  name?: string;
  age?: number;
  email?: string;
  username?: string;
  _id? :string
}

const Users: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);
  const { auth, loading } = authContext; // Destructure loading from context
  const token = auth.accessToken;

  useEffect(() => {
    const fetchData = async () => {
      // Exit early if token is not available
      if (!token) {
        setError("You need to log in to see users...");
        return;
      }

      try {
        
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach JWT token here
          },
        });

        if (!res.ok) {
          if (res.status === 403) {
            setError("You need to log in to see users...");
          } else {
            setError("Error fetching user data.");
          }
          return;
        }

        const resBody: UserData[] = await res.json();
        setData(resBody);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data.");
      }
    };

    // Only fetch data if loading is false and token is present
    if (!loading) {
      fetchData();
    }
  }, [token, loading]); // Depend on token and loading

  if (loading) {
    return <div className="loading">Loading authentication...</div>; // Show loading message while waiting for token
  }

  if (error) {
    return <div className="error">{error}</div>; // Show error message
  }

  if (!data.length) {
    return <div className="message">No users found.</div>; // Optional: message if no users are available
  }
console.log(data)
  return (
    <div className="users">
      {data.map((user) => (
        <Link key={user.id } to={`/users/${user.id }`} className="user-link">
          <div className="user">
            <h2>{user.name || user.username}</h2>
            <p>{`Age: ${user.age || user.email}`}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Users;
