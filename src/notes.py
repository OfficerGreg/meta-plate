from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import InputRequired, Length


class NotesForm(FlaskForm):
   note = StringField(validators=[InputRequired(), 
      Length(min=4, max=30)], render_kw={"placeholder": "note"})
   submit = SubmitField("add note")