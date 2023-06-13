from flask import Blueprint, jsonify, session

from models import User

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/dashboard")
def dashboard():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()

    user.add_folder("test")

    folders = [
        {"id": folder.id, "name": folder.name, "notes": folder.notes} 
        for folder in user.folders
    ]

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "folders": folders
    })