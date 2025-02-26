from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS  # ✅ Import CORS
from app.config import Config
from pyngrok import ngrok

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    
    # ✅ Enable CORS for frontend communication
    CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins (change this later for security)

    # Import and register blueprints
    from app.auth.routes import auth_bp
    from app.charities.routes import charity_bp
    
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(charity_bp, url_prefix="/charities")

    # ✅ Start ngrok tunnel only in development mode
    if app.config.get("ENV") == "development":
        port = 5000
        public_url = ngrok.connect(port).public_url
        print(f" * ngrok tunnel running at: {public_url}")

    return app
