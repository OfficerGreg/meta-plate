from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError


class NotesForm(FlaskForm):
   note = StringField(validators=[InputRequired(), 
      Length(min=4, max=30)], render_kw={"placeholder": "note"})
   submit = SubmitField("add note")