from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, User, Folder


app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)

CORS(app, supports_credentials=True)

server_session = Session(app)


db.init_app(app)

with app.app_context():
    db.create_all()

# note


@app.route("/note", methods=["POST"])
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


# folder
@app.route("/folders", methods=["POST"])
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


@app.route("/dashboard")
def dashboard():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()

    user.add_folder("test")

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "folders": [
            {"id": folder.id, "name": folder.name} for folder in user.folders
        ]
    })


@app.route("/@me")
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


# register
@app.route("/register", methods=["POST"])
def register():
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(username=username).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists!"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email
    })


# login
@app.route("/login", methods=["POST"])
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


@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user_id")
    return "200"


if __name__ == "__main__":
    app.run(debug=True)
