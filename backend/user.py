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


# edit user route
@user_bp.route("/@me/edit", methods=["POST"])
def edit_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()

    username = request.json.get("username")
    email = request.json.get("email")
    password = request.json.get("password")
    
    user.username = username
    user.email = email
    user.password = password

    db.session.commit()

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "points": user.points
    })


# get all users route
# gets only users that are not admins
@user_bp.route("/@me/all", methods=["GET"])
def get_all_users():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    users = User.query.all()

    user = User.query.filter_by(id=user_id).first()

    if user.is_admin == False:
        return jsonify({"error": "unauthorized"}), 401

    return jsonify([
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_admin": user.is_admin,
            "points": user.points
        } for user in users if user.is_admin == False
    ])


# delete user route
@user_bp.route("/@me/delete/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    current_user_id = session.get("user_id")

    if not current_user_id:
        return jsonify({"error": "unauthorized"}), 401

    current_user = User.query.filter_by(id=current_user_id).first()

    if current_user.is_admin == False:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        "message": "user deleted"
    })