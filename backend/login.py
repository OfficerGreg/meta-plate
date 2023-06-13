from flask import Blueprint, jsonify, session, request

from app_bcrypt import bcrypt
from models import User


login_bp = Blueprint("login", __name__)


# login
@login_bp.route("/login", methods=["POST"])
def login():

    username = request.json["username"]
    password = request.json["password"]

    user = User.query.filter_by(username=username).first()

    if user is None:
        return jsonify({"error": "unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })


# logout
@login_bp.route("/logout", methods=["POST"])
def logout():
    session.pop("user_id")
    return "200"