from flask import Flask, render_template, redirect, url_for, request, flash
from flask_login import login_user, LoginManager, login_required, logout_user, current_user
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt

from models import db, User, Note, Folder
from register import RegisterForm
from login import LoginForm
from notes import NotesForm
from folder import FolderForm

template_dir = "../templates/"
static_dir = "../static/"

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

bcrypt = Bcrypt(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SECRET_KEY"] = "secret_key"

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


db.init_app(app)

# create db
with app.app_context():
    db.create_all()


# Routes

@app.route("/")
def home():
    return render_template("home.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    # show login form
    form = LoginForm()

    # log user in
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

    folder_form = FolderForm()
    if folder_form.validate_on_submit():
        user.add_folder(folder_form.folder.data)
        return redirect(url_for("dashboard"))

    folders = user.folders

    notes_form = NotesForm()
    notes_form.folder_id.choices = [(folder.id, folder.name) for folder in folders]
    if notes_form.validate_on_submit():
        folder_id = notes_form.folder_id.data
        note_name = notes_form.note_name.data
        note_text = notes_form.note_text.data
        user.add_note_to_folder(folder_id, note_name, note_text)
        return redirect(url_for("dashboard"))

    notes = user.get_notes()
    return render_template("dashboard.html", user=user, folder_form=folder_form, notes_form=notes_form, notes=notes)


@app.route("/note/<note_id>", methods=["GET", "POST"])
@login_required
def note(note_id):
    note = Note.query.get(note_id)

    # Anti-hacker security
    if note.user_id != current_user.id:
        return render_template("unauthorized.html")

    # Submit
    if request.method == "POST":
        note_content = request.form.get("note_content")
        note.text = note_content
        db.session.commit()
        return redirect(url_for("note", note_id=note_id))

    return render_template("note.html", note=note)


@app.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    logout_user()
    return redirect("/")


@app.route("/register", methods=["GET", "POST"])
def register():
    # show reg form
    form = RegisterForm()

    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data)
        new_user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return redirect(url_for("dashboard"))

    return render_template("register.html", form=form)


@app.route("/delete_note", methods=["POST"])
@login_required
def delete_note():
    note_id = request.form.get("note_id")
    note = Note.query.get(note_id)

    # Anti-hacker security
    if note.user_id != current_user.id:
        return render_template("unauthorized.html")

    if note.folder:
        # Delete note from folder
        note.folder.notes.remove(note)

    db.session.delete(note)
    db.session.commit()

    flash("Note deleted successfully", "success")
    return redirect(url_for("dashboard"))

@app.route("/delete_folder", methods=["POST"])
@login_required
def delete_folder():
    folder_id = request.form.get("folder_id")
    folder = Folder.query.get(folder_id)

    # Anti-hacker security
    if folder.user_id != current_user.id:
        return render_template("unauthorized.html")

    # Delete all notes within the folder
    for note in folder.notes:
        db.session.delete(note)

    db.session.delete(folder)
    db.session.commit()

    flash("Folder and its notes deleted successfully", "success")
    return redirect(url_for("dashboard"))



if __name__ == "__main__":
    app.run(debug=True)
