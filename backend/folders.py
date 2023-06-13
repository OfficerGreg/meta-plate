from flask import Blueprint, jsonify, session, request
from models import db, User, Folder


folders_bp = Blueprint("folders", __name__)

# create a new folder
@folders_bp.route("/folders", methods=["POST"])
def create_folder():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    folder_name = request.json.get("name")

    if not folder_name:
        return jsonify({"error": "Folder name is required"}), 400

    existing_folder = Folder.query.filter_by(
        user_id=user.id, name=folder_name).first()

    if existing_folder:
        return jsonify({"error": "Folder already exists"}), 409

    new_folder = Folder(name=folder_name, user_id=user.id)
    db.session.add(new_folder)
    db.session.commit()

    return jsonify({
        "id": new_folder.id,
        "name": new_folder.name,
        "user_id": new_folder.user_id
    })
