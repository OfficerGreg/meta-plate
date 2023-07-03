import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import httpClient from '../../httpClient';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const history = useHistory();

  const fetchQuizData = async () => {
    try {
      const response = await httpClient.get("//localhost:5000/quiz");
      const quizData = response.data.quizzes;
      setQuizzes(quizData);
    } catch (error) {
      console.log("Error fetching quiz data:", error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  return (
    <div>
      <h2 className="page-header">Quiz</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {quizzes.map((quiz) => (
              <div className="col-6" key={quiz.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{quiz.name}</h5>
                    <p className="card-text">
                      Created by: {quiz.created_by.username}
                    </p>
                    <Link
                      to={`/quiz/${quiz.id}`}
                      className="btn btn-primary"
                    >
                      Start Quiz
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
