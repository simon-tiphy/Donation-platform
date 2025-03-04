from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config
from models import db

app = Flask(__name__)
app.config.from_object(Config)

# Initialize Extensions
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)  # Allows frontend to communicate with the backend

@app.route("/")
def home():
    return {"message": "Welcome to the Automated Donation Platform"}

if __name__ == "__main__":
    app.run(debug=True)
