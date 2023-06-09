import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import httpClient from '../../httpClient';
import './StartQuiz.css';
import { Button } from 'react-bootstrap';
import CountUp from 'react-countup';

const StartQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [quizName, setQuizName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(5);
  const [remainingMilliseconds, setRemainingMilliseconds] = useState(10000);
  const [timeBarWidth, setTimeBarWidth] = useState(100);
  const [quizStarted, setQuizStarted] = useState(false);
  const [user, setUser] = useState(null);
  const [oldScore, setOldScore] = useState(0);

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

  const fetchUserData = async () => {
    try {
      const response = await httpClient.get('//localhost:5000/@me');
      setUser(response.data.points);
    } catch (error) {
      console.log('Not authenticated');
      history.push('/login');
    }
  };

  useEffect(() => {
    fetchQuizData();
    fetchUserData();
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      handleNextQuestion();
    } else if (selectedAnswerIndex === null) {
      const timer = setInterval(() => {
        setRemainingMilliseconds((prevTime) => prevTime - 100);
      }, 100);

      return () => clearInterval(timer);
    }
  }, [selectedAnswerIndex, remainingTime]);

  useEffect(() => {
    setRemainingTime(Math.floor(remainingMilliseconds / 1000));
    setTimeBarWidth((remainingMilliseconds / 10000) * 100 - 15);
  }, [remainingMilliseconds]);
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null); // Reset selected answer for the next question
      setIsAnswerCorrect(null); // Reset correctness of the answer
      setRemainingTime(5); // Reset the timer
      setRemainingMilliseconds(10000); // Reset the milliseconds
    } else {
      // Quiz completed, display score only
      setCurrentQuestionIndex(quiz.questions.length); // Set currentQuestionIndex to a value beyond the question array length
    }
  };

  const handleAnswerSelection = (answerIndex, isCorrect) => {
    setSelectedAnswerIndex(answerIndex);
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) {
      const currentTimeRemaining = remainingTime + remainingMilliseconds / 1000;
      setOldScore(score);
      const newScore = score + 10 * currentTimeRemaining;
      setScore(Math.round(newScore)); // Round the score to a whole number
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  if (quiz.questions.length === 0) {
    return <div>Error: This quiz does not have any questions or answers.</div>;
  }

  const setFinalScore = async () => {
    try {
      console.log(user);
      const response = await httpClient.post('//localhost:5000/@me/score', {
        points: user + Math.round(score), // Rounded score
      });
      console.log(response.data); // Optional: Handle the response as needed
      history.push('/quiz');
      window.location.reload(); // reload seit
    } catch (error) {
      console.log('Error setting score:', error);
    }
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const buttonText = isLastQuestion ? 'Finish Quiz' : 'Next Question';

  return (
    <div>
      {!quizStarted ? (
        <div className="card">
          <h1 style={{ textAlign: 'center' }}>Welcome to the {quizName} quiz</h1>
          <div className="align-button-center">
            <button className="user-info-card__edit-btn" onClick={() => setQuizStarted(true)}>
              Begin Quiz
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="time-bar" style={{ width: `${timeBarWidth}%` }}></div>

          {currentQuestionIndex === quiz.questions.length ? (
            <div>
              <h1>Quiz completed!</h1>
              <p style={{ marginBottom: "20px"}}>Final Score: {score}</p>
              <button  className="user-info-card__edit-btn" onClick={setFinalScore}>
                Save Score
              </button>
            </div>
          ) : (
            <div >
              <h2 >Question {currentQuestionIndex + 1}:</h2>
              <h1 >{currentQuestion.question}</h1>
              <ul className="button-container">
                {currentQuestion.answers.map((answer, index) => (
                  <li key={answer.id}>
                    <button 
                      onClick={() => handleAnswerSelection(index, answer.is_correct)}
                      className={
                        selectedAnswerIndex === index ? (isAnswerCorrect ? 'correct' : 'incorrect') : ''
                      }
                      disabled={selectedAnswerIndex !== null || remainingTime === 0}
                    >
                      {answer.answer}
                    </button>
                  </li>
                ))}
              </ul>
              {selectedAnswerIndex !== null && !isAnswerCorrect && (
                <p className="correct-answer">
                  Correct Answer: {currentQuestion.answers.find((a) => a.is_correct).answer}
                </p>
              )}
            <br></br>
            <br></br>
            <br></br>
              <button className="user-info-card__edit-btn" onClick={handleNextQuestion} disabled={selectedAnswerIndex === null}>
                {buttonText}
              </button>
              <h3 style={{textAlign: "center"}}>
                Score: <CountUp start={oldScore} end={score} duration={1} />
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StartQuiz;
