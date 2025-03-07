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

    # Enable CORS with specific origins
    CORS(app)

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Import and register blueprints
    from app.auth.routes import auth_routes
    from app.donations.routes import donations_routes
    from app.charities.routes import charities_routes
    from app.beneficiaries.routes import beneficiaries_routes  # Import beneficiaries routes
    from app.admin.routes import admin_bp  # Import admin routes

    app.register_blueprint(auth_routes, url_prefix='/api/auth')
    app.register_blueprint(donations_routes, url_prefix='/api/donations')
    app.register_blueprint(charities_routes, url_prefix='/api/charities')
    app.register_blueprint(beneficiaries_routes, url_prefix='/api/beneficiaries')  # Register beneficiaries routes
    app.register_blueprint(admin_bp, url_prefix='/api/admin')  # Register admin routes

    # Debug statement
    print("Registered Blueprints:")
    for blueprint in app.blueprints:
        print(f"- {blueprint}")

    return app