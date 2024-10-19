// // Users.tsx

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../css/Users.css";

// const host: string = import.meta.env.VITE_SERVER_URL;
// const apiUrl: string = `${host}/users`;

// interface UserData {
//   id: string; // Assuming your user data has an ID
//   name: string;
//   age: number;
// }

// const Users: React.FC = () => {
//   const [data, setData] = useState<UserData[] | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(apiUrl);
//         const resBody: UserData[] = await res.json();
//         setData(resBody);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//   }, []);

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


// Users.tsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Users.css";

const host: string = import.meta.env.VITE_SERVER_URL;
const apiUrl: string = `${host}/users`;

interface UserData {
  id: string; // Assuming your user data has an ID
  name: string;
  age: number;
}

const Users: React.FC = () => {
  const [data, setData] = useState<UserData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        
        // Check if the response is ok (status code 200-299)
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

    fetchData();
  }, []);

  if (error) {
    return <div className="loading">{error}</div>;
  }

  if (!data) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="users">
      {data.map((user) => (
        <Link key={user.id} to={`/user/${user.id}`} className="user-link">
          <div className="user">
            <h2>{user.name}</h2>
            <p>{`Age: ${user.age}`}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Users;
