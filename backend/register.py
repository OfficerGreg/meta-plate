from flask import Blueprint, jsonify, session, request
from models import db, User

from app_bcrypt import bcrypt


register_bp = Blueprint("register", __name__)

# register
@register_bp.route("/register", methods=["POST"])
def register():

    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]
    is_admin = request.json["is_admin"]

    user_exists = User.query.filter_by(username=username).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists!"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password, is_admin=is_admin)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
        "is_admin": new_user.is_admin
    })
