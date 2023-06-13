from flask import Blueprint, jsonify, session, request
from models import User, Folder, Note

notes_bp = Blueprint("notes", __name__)

# create a note
@notes_bp.route("/note", methods=["POST"])
def create_note():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    folder_id = request.json.get("folder_id")
    note_name = request.json.get("name")
    note_text = request.json.get("text")

    if not folder_id or not note_name or not note_text:
        return jsonify({"error": "Invalid request data"}), 400

    folder = user.get_folder_by_id(folder_id)

    if not folder:
        return jsonify({"error": "Folder not found"}), 404

    user.add_note_to_folder(folder_id, note_name, note_text)

    return jsonify({
        "message": "Note created successfully",
        "folder_id": folder_id,
        "note_name": note_name,
        "note_text": note_text
    })


# get all notes of a certain folder
@notes_bp.route("/folders/<int:folder_id>/notes", methods=["GET"])
def get_notes_by_folder(folder_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    folder = Folder.query.filter_by(id=folder_id, user_id=user_id).first()

    if not folder:
        return jsonify({"error": "Folder not found"}), 404

    notes = [
        {"id": note.id, "name": note.name, "text": note.text}
        for note in folder.notes
    ]

    return jsonify(notes)


# get the "text" of a specific note
@notes_bp.route("/folders/<int:folder_id>/notes/<string:note_id>/text", methods=["GET"])
def get_note_text(folder_id, note_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    folder = Folder.query.filter_by(id=folder_id, user_id=user_id).first()

    if not folder:
        return jsonify({"error": "Folder not found"}), 404

    note = Note.query.filter_by(id=note_id, folder_id=folder_id).first()

    if not note:
        return jsonify({"error": "Note not found"}), 404

    return jsonify({"text": note.text})
