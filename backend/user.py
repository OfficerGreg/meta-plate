from flask import Blueprint, jsonify, session

from models import User

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
        "email": user.email,
        "folders": [
            {"id": folder.id, "name": folder.name} for folder in user.folders
        ]
    })

