from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError

class ApiKeyForm(FlaskForm):
   api_key = StringField(validators=[InputRequired(), 
      Length(min=4, max=30)], render_kw={"placeholder": "api key"})
   submit = SubmitField("update")