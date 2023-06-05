from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError

class LoginForm(FlaskForm):
   username = StringField(validators=[InputRequired(), 
      Length(min=4, max=30)], render_kw={"placeholder": "Username"})
   password = PasswordField(validators=[InputRequired(), 
      Length(min=4, max=50)], render_kw={"placeholder": "Password"})
   submit = SubmitField("Login")
