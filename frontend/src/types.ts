export interface User {
    id: number;
    username: string;
    email: string;
    folders: Folder[];
  }
  
  export interface Folder {
    id: number;
    name: string;
  }
  