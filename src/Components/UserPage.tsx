import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverHost } from "./constants";
import "../css/UserPage.css";

interface UserData {
  name: string;
  age: number;
  // Add other properties as needed
}

const UserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = `${serverHost}/users`;
        const response = await fetch(`${apiUrl}/${id}`);
        const userData: UserData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
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
