# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # Enable CORS
    CORS(app)

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Import and register blueprints
    from app.auth.routes import auth_routes
    from app.donations.routes import donations_routes
    from app.charities.routes import charities_routes
    app.register_blueprint(auth_routes, url_prefix='/api/auth')
    app.register_blueprint(donations_routes, url_prefix='/api/donations')
    app.register_blueprint(charities_routes, url_prefix='/api/charities')

    # Debug statement
    print("Registered Blueprints:")
    for blueprint in app.blueprints:
        print(f"- {blueprint}")

    return app