from flask import Blueprint

# Initialize the main blueprint (if needed in the future)
main_bp = Blueprint("main", __name__)

def register_blueprints(app):
    """Registers all blueprints with the Flask app."""
    from app.routes.auth import auth_bp  # Import inside function to prevent circular imports

    blueprints = [auth_bp]  # List of blueprints

    for bp in blueprints:
        app.register_blueprint(bp, url_prefix=f'/api/{bp.name}')  # Prefix API routes
