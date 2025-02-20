from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from config import Config  # Import config settings

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()

def create_app():
    """Create and configure the Flask app."""
    app = Flask(__name__)

    # Load configuration from config.py
    app.config.from_object(Config)

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    CORS(app)  # Enable CORS for frontend communication

    # Import models to ensure they're registered before migrations
    from app import models  

    # Register all blueprints dynamically
    from app.routes import register_blueprints
    register_blueprints(app)

    return app
