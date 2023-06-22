export interface User {
  id: number;
  username: string;
  email: string;
  folders: Folder[];
}

export interface Folder {
  id: number;
  name: string;
  notes: Note[];
}

export interface Note {
  id: string;
  name: string;
  text: string;
  folder_id: number;
  user_id: number;
}
