from flask import Blueprint, jsonify, session, request

from models import User, Quiz, Question, db

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

    # Create the quiz
    quiz = Quiz(name=quiz_name, user=user)
    db.session.add(quiz)
    db.session.commit()

    return jsonify({"message": "Quiz created successfully"})


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

    return jsonify({"message": "Question added successfully"})

