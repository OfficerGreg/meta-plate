export const User = {
  id: 0,
  username: "",
  email: "",
  folders: [],
};

export const Folder = {
  id: 0,
  name: "",
  notes: [],
};

export const Note = {
  id: "",
  name: "",
  text: "",
  folder_id: 0,
  user_id: 0,
};

export const Quiz = {
  id: 0,
  name: "",
  user_id: 0,
  questions: [],
};

export const Question = {
  id: 0,
  question: "",
  quiz_id: 0,
  answers: [],
};

export const Answer = {
  id: 0,
  answer: "",
  is_correct: false,
  question_id: 0,
};