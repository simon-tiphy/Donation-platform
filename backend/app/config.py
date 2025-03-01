import os
from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Flask & Session Security
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
    SESSION_TYPE = "filesystem"  # Can be "redis", "memcached", or "sqlalchemy"
    SESSION_PERMANENT = True  # Ensure long-term session storage
    SESSION_USE_SIGNER = True  # Adds extra security to cookies
    SESSION_FILE_DIR = "./flask_session"  # Folder to store session files
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)  # Users stay logged in for 7 days

    # ✅ Flask-Login Integration
    REMEMBER_COOKIE_DURATION = timedelta(days=7)  # Keep "remember me" sessions active for a week
    REMEMBER_COOKIE_HTTPONLY = True  # Prevent JavaScript access to cookies
    REMEMBER_COOKIE_SECURE = os.getenv("FLASK_ENV") == "production"  # Secure cookies in production

    # ✅ CSRF Protection
    WTF_CSRF_ENABLED = True  # Protects against CSRF attacks

    # ✅ JWT (Remove this if you're not using JWT)
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your_jwt_secret_key")
