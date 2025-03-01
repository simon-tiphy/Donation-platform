from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager
from flask_session import Session  # ✅ Flask-Session for persistent login
from app.config import Config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
session_manager = Session()  # ✅ Flask-Session for persistent login

def create_app():
    """Create and configure the Flask app."""
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    session_manager.init_app(app)  # ✅ Initialize Flask-Session

    # Set login view for unauthorized users
    login_manager.login_view = "auth.login"

    # ✅ Global CORS (Allows both localhost & deployed frontend)
    CORS(
        app,
        resources={r"/*": {"origins": ["http://localhost:3000", "https://your-frontend-domain.com"]}},
        supports_credentials=True,
    )

    # Import models before first request to avoid circular imports
    from app.auth.models import User  

    @login_manager.user_loader
    def load_user(user_id):
        """Load user by ID for Flask-Login."""
        return db.session.get(User, int(user_id))  # ✅ Uses `db.session.get()` (SQLAlchemy 2.x)

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
