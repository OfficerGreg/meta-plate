import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import httpClient from '../../httpClient';

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newAnswerText, setNewAnswerText] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const history = useHistory();

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      question: newQuestionText,
      answers: [],
      editable: true,
    };

    setQuestions([...questions, newQuestion]);
    setNewQuestionText('');
    setNewAnswerText('');
  };

  const handleAddAnswer = (questionIndex) => {
    const newAnswer = {
      answer: newAnswerText,
      isCorrect: isAnswerCorrect,
      editable: true,
    };
  
    const updatedQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        return {
          ...question,
          answers: [...question.answers, newAnswer],
        };
      }
      return question;
    });
  
    setQuestions(updatedQuestions);
    setNewAnswerText('');
    setIsAnswerCorrect(false);
  };
  

  const handleQuestionClick = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].editable = true;
    setQuestions(updatedQuestions);
  };

  const handleAnswerClick = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].editable = true;
    setQuestions(updatedQuestions);
  };

  const handleQuestionTextChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerTextChange = (e, questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].answer = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleRemoveAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleCreateQuiz = async () => {
    try {
      const formattedQuestions = questions.map((question) => {
        const formattedAnswers = question.answers.map((answer) => {
          const { editable, ...rest } = answer;
          return rest;
        });
        return {
          ...question,
          answers: formattedAnswers,
        };
      });
  
      const response = await httpClient.post('//localhost:5000/quiz/create', {
        name: quizName,
        questions: formattedQuestions,
      });
  
      const data = response.data;
      console.log(data);
      history.push('/quiz');
    } catch (error) {
      console.log('Error creating quiz:', error);
    }
  };
  

  return (
    <div>
      <h2 className="page-header">Create Quiz</h2>
      <div className="mb-3">
        <label className="form-label">Quiz Name</label>
        <input
          type="text"
          className="form-control"
          value={quizName}
          onChange={handleQuizNameChange}
        />
      </div>
      <div>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <p
              className="clickable-text"
              onClick={() => handleQuestionClick(questionIndex)}
            >
              Question {questionIndex + 1}:
            </p>
            {question.editable ? (
              <input
                type="text"
                className="form-control"
                value={question.question}
                onChange={(e) => handleQuestionTextChange(e, questionIndex)}
              />
            ) : (
              <p>{question.question}</p>
            )}
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <p
                  className="clickable-text"
                  onClick={() => handleAnswerClick(questionIndex, answerIndex)}
                >
                  Answer {answerIndex + 1}:
                </p>
                {answer.editable ? (
                  <input
                    type="text"
                    className="form-control"
                    value={answer.answer}
                    onChange={(e) =>
                      handleAnswerTextChange(e, questionIndex, answerIndex)
                    }
                  />
                ) : (
                  <p>{answer.answer}</p>
                )}
                <label>
                  <input
                    type="checkbox"
                    checked={answer.isCorrect}
                    onChange={() => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[questionIndex].answers[
                        answerIndex
                      ].isCorrect = !answer.isCorrect;
                      setQuestions(updatedQuestions);
                    }}
                  />
                  Is Answer Correct?
                </label>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveAnswer(questionIndex, answerIndex)}
                >
                  Remove Answer
                </button>
              </div>
            ))}
            <button
              className="btn btn-primary"
              onClick={() => handleAddAnswer(questionIndex)}
            >
              Add Answer
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveQuestion(questionIndex)}
            >
              Remove Question
            </button>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button className="btn btn-primary" onClick={handleCreateQuiz}>
        Create
      </button>
    </div>
  );
};

export default CreateQuiz;
