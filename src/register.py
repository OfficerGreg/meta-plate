from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, EmailField
from wtforms.validators import InputRequired, Length, ValidationError
from models import User

class RegisterForm(FlaskForm):
   username = StringField(validators=[InputRequired(), 
      Length(min=4, max=30)], render_kw={"placeholder": "Username"})
   email = EmailField(validators=[InputRequired(),
      Length(min=4, max=70)], render_kw={"placeholder": "Email"})
   password = PasswordField(validators=[InputRequired(), 
      Length(min=4, max=50)], render_kw={"placeholder": "Password"})
   submit = SubmitField("Register")

   #check if username is unique
   def validate_username(self, username):
      existing_username = User.query.filter_by(username=username.data).first()
      if existing_username:
         raise ValidationError("Username already exists!" )