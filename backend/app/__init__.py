from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager
from app.config import Config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    # Set login view for unauthorized users
    login_manager.login_view = "auth.login"

    # ✅ FULLY GLOBAL CORS SETUP (Allow all routes, methods, and headers)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, allow_headers="*", supports_credentials=True)

    # Import models to ensure availability before first request
    from app.auth.models import User  

    @login_manager.user_loader
    def load_user(user_id):
        """Load user by ID for Flask-Login."""
        return db.session.get(User, int(user_id))

    # Import and register blueprints
    from app.auth.routes import auth_bp
    from app.charities.routes import charity_bp  
    from app.donations.routes import donation_bp
    from app.admin.routes import admin_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(charity_bp, url_prefix="/charities")  
    app.register_blueprint(donation_bp, url_prefix="/donations")
    app.register_blueprint(admin_bp, url_prefix="/admin")

    return app