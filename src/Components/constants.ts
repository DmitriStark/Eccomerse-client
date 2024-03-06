// Define a custom type or interface for your extended ImportMeta
  
  // Use the custom type or interface for import.meta
  export const serverHost: string = import.meta .env.VITE_SERVER_URL;
  export const itemsPerPage = 12;
  export const sortCategories = ['name', 'price'];
  export const apiUrl = 'http://localhost:8000/products';
  