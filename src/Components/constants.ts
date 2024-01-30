// Define a custom type or interface for your extended ImportMeta
interface ExtendedImportMeta extends ImportMeta {
    env: {
      VITE_SERVER_URL: string;
      // Add other environment variables as needed
    };
  }
  
  // Use the custom type or interface for import.meta
  export const serverHost: string = (import.meta as ExtendedImportMeta).env.VITE_SERVER_URL;
  export const itemsPerPage = 12;
  export const sortCategories = ['name', 'price'];
  export const apiUrl = 'http://localhost:8000/products';
  