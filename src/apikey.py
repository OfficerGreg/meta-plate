from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import InputRequired, Length

class ApiKeyForm(FlaskForm):
   api_key = StringField(validators=[InputRequired(), 
      Length(min=4, max=120)], render_kw={"placeholder": "api key"})
   submit = SubmitField("update")