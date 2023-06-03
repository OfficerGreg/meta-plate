from flask import Flask, render_template, redirect, url_for
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt

from models import db, User
from register import RegisterForm
from login import LoginForm
from apikey import ApiKeyForm


app = Flask(__name__)

bcrypt = Bcrypt(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/database.db"
app.config["SECRET_KEY"] = "secret_key"

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

@login_manager.user_loader
def load_user(user_id):
   return User.query.get(int(user_id))



db.init_app(app)

#create db
with app.app_context():
    db.create_all()

#Routes

@app.route("/")
def home():
   return render_template("home.html")

@app.route("/login", methods=["GET", "POST"])
def login():
   #show login form
   form = LoginForm()

   #log user in
   if form.validate_on_submit():
      user = User.query.filter_by(username=form.username.data).first()
      if user:
         if bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user)
            return redirect(url_for("dashboard"))

   return render_template("login.html", form=form)

@app.route("/dashboard", methods=["GET", "POST"])
@login_required
def dashboard():
   user = current_user

   form = ApiKeyForm()
   if form.validate_on_submit():
      # Get the logged-in user
      user = current_user

      # Update the user's API key
      user.api_key = form.api_key.data
      db.session.commit()
      return redirect(url_for("dashboard"))

   notes = user.get_notes()
   return render_template("dashboard.html", form=form, notes=notes)

@app.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
   logout_user()
   return redirect("/")

@app.route("/register", methods=["GET", "POST"])
def register():
   #show reg form
   form = RegisterForm()

   if form.validate_on_submit():
      hashed_password = bcrypt.generate_password_hash(form.password.data)
      new_user = User(username=form.username.data, password=hashed_password)
      db.session.add(new_user)
      db.session.commit()
      return redirect(url_for("login"))

   return render_template("register.html", form=form)

@app.route("/notes", methods=["GET", "POST"])
@login_required
def notes():
   # Get the logged-in user
   user = current_user

   # Add a new note
   user.add_note("This is a new note")
   db.session.commit()

   # Retrieve all notes
   notes = user.get_notes()

   return render_template("notes.html", notes=notes)



if __name__ == "__main__":
   app.run(debug=True)