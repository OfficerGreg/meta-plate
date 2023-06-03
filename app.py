from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SECRET_KEY"] = "secret_key"

db = SQLAlchemy(app)

# Table Model for DB
class User(db.Model, UserMixin):
   id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(30), nullable=False)
   password = db.Column(db.String(50), nullable=False)


@app.route("/")
def home():
   return render_template("home.html")

@app.route("/login")
def login():
   return render_template("login.html")

@app.route("/register")
def register():
   return render_template("register.html")


if __name__ == '__main__':
   app.run(debug=True)
