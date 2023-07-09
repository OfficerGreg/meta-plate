from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

import uuid

db = SQLAlchemy()

# User Table Model for DB
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    points = db.Column(db.Integer, nullable=False, default=0)

    is_admin = db.Column(db.Boolean, default=False)
    
    folders = db.relationship("Folder", backref="user", lazy=True)
    quizzes = db.relationship("Quiz", backref="user", lazy=True)
    modules = db.relationship("Modul", backref="user", lazy=True)

    def add_modul(self, modul_name):
        modul = Modul(name=modul_name, user=self)
        db.session.add(modul)
        db.session.commit()

    def add_zp(self, modul_name, zp):
        modul = Modul.query.filter_by(name=modul_name).first()
        if modul:
            modul.zp_grade = zp
            db.session.commit()
        else:
            raise ValueError("Module not found.")
        

    def add_lb(self, modul_name, lb):
        modul = Modul.query.filter_by(name=modul_name).first()
        if modul:
            modul.lb_grade = lb
            db.session.commit()
        else:
            raise ValueError("Module not found.")
        
    def add_teacher(self, modul_name, teacher_name):
        modul = Modul.query.filter_by(name=modul_name).first()
        if modul:
            modul.teacher = teacher_name
            db.session.commit()
        else:
            raise ValueError("Module not found.")
        
    def get_modules(self):
        return self.modules
    
    def get_notes(self):
        notes = []
        for folder in self.folders:
            notes.extend(folder.notes)
        return notes

    def get_note_by_id(self, note_id):
        for folder in self.folders:
            for note in folder.notes:
                if note.id == note_id:
                    return note
        return None

    def add_note_to_folder(self, folder_id, note_name, note_text):
        folder = self.get_folder_by_id(folder_id)
        if folder:
            note = Note(name=note_name, text=note_text, folder=folder, user=self)
            db.session.add(note)
            db.session.commit()

    def delete_note_by_id(self, note_id):
        note = self.get_note_by_id(note_id)
        if note:
            db.session.delete(note)
            db.session.commit()

    def set_note_text(self, note_id, note_text):
        note = self.get_note_by_id(note_id)
        if note:
            note.text = note_text
            db.session.commit()

    def get_folder_by_id(self, folder_id):
        for folder in self.folders:
            if folder.id == folder_id:
                return folder
        return None

    def add_folder(self, folder_name):
        folder = Folder(name=folder_name, user=self)
        db.session.add(folder)
        db.session.commit()
        

    def add_note_to_folder(self, folder_id, note_name, note_text):
        folder = Folder.query.get(folder_id)
        if folder and folder.user_id == self.id:
            note = Note(name=note_name, text=note_text, folder_id=folder_id, user_id=self.id)
            db.session.add(note)
            db.session.commit()
   
    def delete_folder_by_id(self, folder_id):
        folder = self.get_folder_by_id(folder_id)
        if folder:
            db.session.delete(folder)
            db.session.commit()


class Folder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    notes = db.relationship("Note", backref="folder", lazy=True)


class Note(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(30), unique=True, nullable=False)
    text = db.Column(db.String)
    folder_id = db.Column(db.Integer, db.ForeignKey("folder.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)


class Quiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    questions = db.relationship("Question", backref="quiz", lazy=True)

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String, nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey("quiz.id"), nullable=False)
    answers = db.relationship("Answer", backref="question", lazy=True)


class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String, nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False, default=False)
    question_id = db.Column(db.Integer, db.ForeignKey("question.id"), nullable=False)


class Modul(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    zp_grade = db.Column(db.Float, nullable=True)
    lb_grade = db.Column(db.Float, nullable=True)
    teacher = db.Column(db.String(30), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    



