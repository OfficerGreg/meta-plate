from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

import json

db = SQLAlchemy()

# User Table Model for DB
class User(db.Model, UserMixin):
   id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(30), nullable=False, unique=True)
   password = db.Column(db.String(100), nullable=False)
   api_key  = db.Column(db.String(100))
   notes    = db.relationship("Note", backref="user", lazy=True)

   def get_notes(self):
      return self.notes

   def add_note(self, note_name, note_text):
      # Check if the note name is unique
      if not any(note.name == note_name for note in self.notes):
         note = Note(name=note_name, text=note_text, user=self)
         db.session.add(note)
         db.session.commit()

   def delete_note_by_name(self, note_name):
      note = next((note for note in self.notes if note.name == note_name), None)
      if note:
         db.session.delete(note)
         db.session.commit()

   
   def add_text(self, note_name, note_text):
      note = next((note for note in self.notes if note.name == note_name), None)
      if note:
         note.text = note_text
         db.session.commit()

# Note Table Model for DB
class Note(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(30), unique=True, nullable=False)
   text = db.Column(db.String)
   user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
