from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager  # ✅ Replace Flask-Login with JWT
from app.config import Config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()  # ✅ Initialize JWTManager

def create_app():
    """Create and configure the Flask app."""
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)  # ✅ Initialize JWT

    # Configure JWT
    app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY  # Use a secure key from config
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = Config.JWT_ACCESS_TOKEN_EXPIRES  # Token expiration time

    # ✅ Global CORS (Allows both localhost & deployed frontend)
    CORS(
        app,
        resources={r"/*": {"origins": ["http://localhost:3000", "https://your-frontend-domain.com"]}},
        supports_credentials=True,
    )

    # ✅ Import models AFTER `db.init_app` to avoid circular imports
    from app.auth.models import User  

    # ✅ JWT user loader (optional, for advanced use cases)
    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        """Load user from JWT identity."""
        identity = jwt_data["sub"]  # Extract identity from JWT payload
        return db.session.get(User, identity["id"])  # Fetch user from database

    # ✅ Import and register blueprints (ensure all exist before registering)
    from app.auth.routes import auth_bp
    from app.charities.routes import charity_bp  
    from app.donations.routes import donation_bp
    from app.admin.routes import admin_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(charity_bp, url_prefix="/charities")  
    app.register_blueprint(donation_bp, url_prefix="/donations")
    app.register_blueprint(admin_bp, url_prefix="/admin")

    return app