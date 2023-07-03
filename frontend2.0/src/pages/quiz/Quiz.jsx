import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import httpClient from '../../httpClient';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [user, setUser] = useState(null);
  const history = useHistory();

  const fetchQuizData = async () => {
    try {
      const response = await httpClient.get('//localhost:5000/quiz');
      const quizData = response.data.quizzes;
      setQuizzes(quizData);
    } catch (error) {
      console.log('Error fetching quiz data:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await httpClient.get('//localhost:5000/@me');
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.log('Not authenticated');
      history.push('/login');
    }
  };

  useEffect(() => {
    fetchQuizData();
    fetchUserData();
  }, []);

  const isQuizCreatedByUser = (quiz) => {
    return user && quiz.created_by.id === user.id;
  };

  return (
    <div>
      <h2 className="page-header">Quiz</h2>
      <div className="row mb-3">
        <div className="col-6">
          {user && (
            <Link to="/quiz/create" className="btn btn-primary" style={{borderStyle: "solid"}}>
              <h1>Create Quiz</h1>
            </Link>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-6" >
          <h4>Your Quizzes</h4>
          <div className="row">
            {quizzes.map((quiz) =>
              isQuizCreatedByUser(quiz) ? (
                <div className="col-6" key={quiz.id}>
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">{quiz.name}</h2>
                      <p className="card-text" >
                        Created by: {quiz.created_by.username}
                      </p>
                      <Link style={{borderStyle: "solid"}}
                        to={`/quiz/${quiz.id}/edit`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <Link style={{borderStyle: "solid"}}
                        to={`/quiz/${quiz.id}`}
                        className="btn btn-primary"
                      >
                        Start Quiz
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
        <div className="col-6">
          <h4>All Quizzes</h4>
          <div className="row">
            {quizzes.map((quiz) =>
              !isQuizCreatedByUser(quiz) ? (
                <div className="col-6" key={quiz.id}>
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">{quiz.name}</h2>
                      <p className="card-text">
                        Created by: {quiz.created_by.username}
                      </p>
                      <Link style={{borderStyle: "solid"}}
                        to={`/quiz/${quiz.id}`}
                        className="btn btn-primary"
                      >
                        Start Quiz
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
