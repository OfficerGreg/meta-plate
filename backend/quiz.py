from flask import Blueprint, jsonify, session, request

from models import User, Quiz, Question, Answer, db

import random

quiz_bp = Blueprint("quiz", __name__)


@quiz_bp.route("/quiz")
def get_all_quizzes():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    # Retrieve all quizzes ordered by creation time
    quizzes = Quiz.query.order_by(Quiz.id).all()

    # Prepare the response
    quizzes_data = []
    for quiz in quizzes:
        quiz_data = {
            "id": quiz.id,
            "name": quiz.name,
            "created_by": {
                "id": quiz.user.id,
                "username": quiz.user.username,
                "email": quiz.user.email
            },
            "questions": []  # Add an empty list to store questions
        }

        # Get the questions for the quiz
        questions = quiz.questions
        for question in questions:
            question_data = {
                "id": question.id,
                "text": question.text,
                "answers": []  # Add an empty list to store answers
            }

            # Get the answers for the question
            answers = question.answers
            for answer in answers:
                answer_data = {
                    "id": answer.id,
                    "text": answer.text,
                    "is_correct": answer.is_correct
                }
                question_data["answers"].append(answer_data)

            quiz_data["questions"].append(question_data)

        quizzes_data.append(quiz_data)

    return jsonify({"quizzes": quizzes_data})


#create quiz route
@quiz_bp.route("/quiz/create", methods=["POST"])
def create_quiz():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "user not found"}), 404

    # Extract quiz details from the request
    data = request.json
    quiz_name = data.get("name")
    questions = data.get("questions")

    # Create the quiz
    quiz = Quiz(name=quiz_name, user=user)
    db.session.add(quiz)
    db.session.commit()

    # Add questions to the quiz
    for question_data in questions:
        question_text = question_data.get("question")
        question = Question(text=question_text, quiz=quiz)
        db.session.add(question)
        db.session.commit()

        # Add answers to the question
        answers = question_data.get("answers")
        for answer_data in answers:
            answer_text = answer_data.get("answer")
            is_correct = answer_data.get("isCorrect")
            answer = Answer(text=answer_text, is_correct=is_correct, question=question)
            db.session.add(answer)
            db.session.commit()

    return jsonify({"message": "Quiz created successfully"})



#edit quiz route
@quiz_bp.route("/quiz/<int:quiz_id>/edit", methods=["POST"])
def edit_quiz(quiz_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "user not found"}), 404
    
    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        return jsonify({"error": "quiz not found"}), 404
    
    # check if the user is the creator of the quiz
    if quiz.user_id != user.id:
        return jsonify({"error": "forbidden"}), 403
    
    # Extract quiz details from the request
    data = request.json
    quiz_name = data.get("name")

    # Update the quiz
    quiz.name = quiz_name
    db.session.commit()

    return jsonify({"message": "Quiz updated successfully"})





#add question to quiz route
@quiz_bp.route("/quiz/<int:quiz_id>/add-question", methods=["POST"])
def add_question_to_quiz(quiz_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "user not found"}), 404

    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        return jsonify({"error": "quiz not found"}), 404

    # check if the user is the creator of the quiz
    if quiz.user_id != user.id:
        return jsonify({"error": "forbidden"}), 403

    # Extract question details from the request
    data = request.json
    question_text = data.get("question")

    # Create the question
    question = Question(text=question_text, quiz=quiz)
    db.session.add(question)
    db.session.commit()

    return jsonify({"message": "Question added successfully", "question_id": question.id})



#edit question route
@quiz_bp.route("/quiz/<int:quiz_id>/question/<int:question_id>/edit", methods=["POST"])
def edit_question(quiz_id, question_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "user not found"}), 404
    
    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        return jsonify({"error": "quiz not found"}), 404
    
    # check if the user is the creator of the quiz
    if quiz.user_id != user.id:
        return jsonify({"error": "forbidden"}), 403
    
    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "question not found"}), 404
    
    # Extract question details from the request
    data = request.json
    question_text = data.get("question")

    # Update the question
    question.text = question_text
    db.session.commit()

    return jsonify({"message": "Question updated successfully"})


#add answer to question route
@quiz_bp.route("/quiz/<int:quiz_id>/question/<int:question_id>/add-answer", methods=["POST"])
def add_answer_to_question(quiz_id, question_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "user not found"}), 404

    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        return jsonify({"error": "quiz not found"}), 404

    # check if the user is the creator of the quiz
    if quiz.user_id != user.id:
        return jsonify({"error": "forbidden"}), 403

    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "question not found"}), 404

    # Extract answer details from the request
    data = request.json
    answer_text = data.get("answer")
    is_correct = data.get("is_correct")

    # Create the answer
    answer = Answer(text=answer_text, is_correct=is_correct, question=question)
    db.session.add(answer)
    db.session.commit()

    return jsonify({"message": "Answer added successfully", "answer_id": answer.id})



#edit answer route
@quiz_bp.route("/quiz/<int:quiz_id>/question/<int:question_id>/answer/<int:answer_id>/edit", methods=["POST"])
def edit_answer(quiz_id, question_id, answer_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "user not found"}), 404
    
    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        return jsonify({"error": "quiz not found"}), 404
    
    # check if the user is the creator of the quiz
    if quiz.user_id != user.id:
        return jsonify({"error": "forbidden"}), 403
    
    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "question not found"}), 404
    
    answer = Answer.query.get(answer_id)
    if not answer:
        return jsonify({"error": "answer not found"}), 404
    
    # Extract answer details from the request
    data = request.json
    answer_text = data.get("answer")
    is_correct = data.get("is_correct")

    # Update the answer
    answer.text = answer_text
    answer.is_correct = is_correct
    db.session.commit()

    return jsonify({"message": "Answer updated successfully"})


#start specific quiz route
#get quiz name, questions, answers
@quiz_bp.route("/quiz/<int:quiz_id>/start", methods=["GET"])
def start_quiz(quiz_id):
    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        return jsonify({"error": "quiz not found"}), 404
    
    # Extract quiz details
    quiz_name = quiz.name
    questions = quiz.questions

    # Extract question details
    question_list = []
    for question in questions:
        question_dict = {}
        question_dict["id"] = question.id
        question_dict["question"] = question.text

        # Extract answer details
        answers = question.answers
        answer_list = []
        for answer in answers:
            answer_dict = {}
            answer_dict["id"] = answer.id
            answer_dict["answer"] = answer.text
            answer_dict["is_correct"] = answer.is_correct
            answer_list.append(answer_dict)
        
        question_dict["answers"] = answer_list
        question_list.append(question_dict)

    return jsonify({"quiz_name": quiz_name, "questions": question_list})
