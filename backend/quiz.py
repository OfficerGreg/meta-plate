from flask import Blueprint, jsonify, session, request

from models import User, Quiz, db

quiz_bp = Blueprint("quiz", __name__)


@quiz_bp.route("/quiz")
def dashboard():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })



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