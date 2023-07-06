import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import httpClient from '../../httpClient';

const EditQuiz = () => {
  const [quizName, setQuizName] = useState('');
  const { quizId } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await httpClient.get(`//localhost:5000/quiz/${quizId}`);
      const quizData = response.data;
      setQuizName(quizData.name);
    } catch (error) {
      console.log('Error fetching quiz data:', error);
    }
  };

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleUpdateQuiz = async () => {
    try {
      const response = await httpClient.post(`//localhost:5000/quiz/${quizId}/edit`, {
        name: quizName,
      });
      const data = response.data;
      console.log(data); // handle the response as desired
      history.push('/quiz'); // navigate back to the quiz list page
    } catch (error) {
      console.log('Error updating quiz:', error);
    }
  };

  return (
    <div>
      <h2 className="page-header">Edit Quiz</h2>
      <div className="mb-3">
        <label className="form-label">Quiz Name</label>
        <input
          type="text"
          className="form-control"
          value={quizName}
          onChange={handleQuizNameChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdateQuiz}>
        Update
      </button>
      <Link to="/quiz" className="btn btn-secondary ms-2">Cancel</Link>
    </div>
  );
};

export default EditQuiz;
