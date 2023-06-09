from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, User

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)

CORS(app, supports_credentials=True)

server_session = Session(app)


db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
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

#logout
@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user_id")
    return "200"

if __name__ == "__main__":
    app.run(debug=True)