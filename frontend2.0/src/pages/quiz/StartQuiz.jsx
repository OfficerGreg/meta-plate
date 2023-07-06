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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null); // Reset selected answer for the next question
      setIsAnswerCorrect(null); // Reset correctness of the answer
    } else {
      // Quiz completed, redirect to result page or do something else
    }
  };

  const handleAnswerSelection = (answerIndex, isCorrect) => {
    setSelectedAnswerIndex(answerIndex);
    setIsAnswerCorrect(isCorrect);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div>
      <h1>Welcome to the {quizName} quiz</h1>
      <h2>Question {currentQuestionIndex + 1}:</h2>
      <h3>{currentQuestion.question}</h3>
      <ul>
        {currentQuestion.answers.map((answer, index) => (
          <li key={answer.id}>
            <button
              onClick={() => handleAnswerSelection(index, answer.is_correct)}
              className={selectedAnswerIndex === index ? (isAnswerCorrect ? 'correct' : 'incorrect') : ''}
              disabled={selectedAnswerIndex !== null} // Disable buttons after selecting an answer
            >
              {answer.answer}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleNextQuestion} disabled={selectedAnswerIndex === null}>
        Next Question
      </button>
    </div>
  );
};

export default StartQuiz;
