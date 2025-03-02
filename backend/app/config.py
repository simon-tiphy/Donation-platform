import os
from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Flask & Session Security
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
    
        # JWT Configuration
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your_jwt_secret_key")  # Secret key for signing JWT tokens
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)  # Token expiration time (1 hour)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7) 
    
    
    FLASK_ENV = os.getenv("FLASK_ENV", "development")  # Environment (development, production, etc.)# Refresh token expiration time (7 days)

    
    # ✅ CSRF Protection
    WTF_CSRF_ENABLED = True  # Protects against CSRF attacks

   