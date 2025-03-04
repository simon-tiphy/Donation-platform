# app/config/__init__.py
import os
from datetime import  timedelta
class Config:
    # Secret key for session management and security
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key')

    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable modification tracking

    # JWT configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-jwt-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)