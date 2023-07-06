from flask import Blueprint, jsonify, session, request

from models import User, db

user_bp = Blueprint("user", __name__)


# get the current users info
@user_bp.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()

    return jsonify({
        "id": user.id,
        "username": user.username,
        "points": user.points,
        "email": user.email,
        "folders": [
            {"id": folder.id, "name": folder.name} for folder in user.folders
        ]
    })



#set score of user route
@user_bp.route("/@me/score", methods=["POST"])
def set_score():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()

    points = request.json.get("points")

    user.points = points

    db.session.commit()

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "points": user.points
    })
