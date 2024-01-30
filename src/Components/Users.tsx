import React, { useEffect, useState } from "react";

// Extend ImportMeta interface to include the env property
interface ExtendedImportMeta extends ImportMeta {
  env: {
    VITE_SERVER_URL: string;
    // Add other environment variables as needed
  };
}

const host: string = (import.meta as ExtendedImportMeta).env.VITE_SERVER_URL;
const apiUrl: string = `${host}/users`;

interface UserData {
  name: string;
  age: number;
}

const Users: React.FC = () => {
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        const resBody: UserData = await res.json();
        setData(resBody);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Users;
