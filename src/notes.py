from wtforms import StringField, TextAreaField, SelectField, SubmitField
from wtforms.validators import InputRequired, Length
from flask_wtf import FlaskForm

class NotesForm(FlaskForm):
    folder_id = SelectField("Folder", coerce=int, validators=[InputRequired()])
    note_name = StringField("Note Name", validators=[InputRequired(), Length(max=50)])
    note_text = TextAreaField("Note Text", validators=[InputRequired()])
    submit = SubmitField("Create Note")
