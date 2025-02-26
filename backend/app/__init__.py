from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate  # ✅ Import Flask-Migrate
from app.config import Config  # ✅ Ensure the correct import

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()  # ✅ Add Flask-Migrate instance

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)  # Load configuration
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # ✅ Prevent warnings

    db.init_app(app)  # Bind SQLAlchemy to Flask app
    jwt.init_app(app)  # Bind JWT to Flask app
    migrate.init_app(app, db)  # ✅ Bind Flask-Migrate to app and db

    # Import and register blueprints AFTER initializing extensions
    from app.auth.routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")

    # Ensure database tables exist before running
    with app.app_context():
        db.create_all()

    return app

