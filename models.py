from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

import json

db = SQLAlchemy()

# Table Model for DB
class User(db.Model, UserMixin):
   id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(30), nullable=False, unique=True)
   password = db.Column(db.String(100), nullable=False)
   api_key  = db.Column(db.String(100))
   notes    = db.Column(db.String)

   def set_notes(self, notes):
      self.notes = json.dumps(notes)

   def get_notes(self):
      return json.loads(self.notes) if self.notes else []

   def add_note(self, note):
      notes = self.get_notes()
      notes.append(note)
      self.set_notes(notes)