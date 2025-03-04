from flask import Flask
from .routes import auth_routes

def init_auth(app: Flask):
    """Initialize the authentication module."""
    app.register_blueprint(auth_routes, url_prefix='/api/auth')