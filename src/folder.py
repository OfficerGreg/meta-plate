from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import InputRequired, Length


class FolderForm(FlaskForm):
   folder = StringField(validators=[InputRequired(), 
      Length(min=4, max=30)], render_kw={"placeholder": "folder"})
   submit = SubmitField("add folder")