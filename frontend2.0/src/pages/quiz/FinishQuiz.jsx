import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import httpClient from '../../httpClient';
import './StartQuiz.css';

const StartQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [quizName, setQuizName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(5);
  const [remainingMilliseconds, setRemainingMilliseconds] = useState(5000);

  const history = useHistory();
  const { quizId } = useParams();

  const fetchQuizData = async () => {
    try {
      const response = await httpClient.get(`//localhost:5000/quiz/${quizId}/start`);
      const quizData = response.data;
      setQuiz(quizData);
      setQuizName(quizData.quiz_name);
    } catch (error) {
      console.log('Error fetching quiz data:', error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);


  
  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>

    </div>
  );
};

export default StartQuiz;
