from flask import Flask
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db

from notes import notes_bp
from folders import folders_bp

from register import register_bp
from login import login_bp

from dashboard import dashboard_bp

from user import user_bp

from api import api_bp

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

# Register routes
app.register_blueprint(notes_bp)
app.register_blueprint(folders_bp)
app.register_blueprint(login_bp)
app.register_blueprint(register_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(user_bp)
app.register_blueprint(api_bp)

CORS(app, supports_credentials=True)


server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)