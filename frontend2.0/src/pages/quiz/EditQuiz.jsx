import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import httpClient from '../../httpClient';

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState('');
  const history = useHistory();

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleCreateQuiz = async () => {
    try {
      const response = await httpClient.post('//localhost:5000/quiz/create', {
        name: quizName,
      });
      const data = response.data;
      console.log(data); // handle the response as desired
      history.push('/quiz'); // navigate back to the quiz list page
    } catch (error) {
      console.log('Error creating quiz:', error);
    }
  };

  return (
    <div>
        <h1>Create Quiz</h1>
    </div>
  );
};

export default CreateQuiz;
