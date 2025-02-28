import os
from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your_jwt_secret_key")
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
    SESSION_TYPE = "filesystem"  # Can be "redis", "memcached", or "sqlalchemy"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True  # Security feature to sign cookies
    SESSION_FILE_DIR = "./flask_session"  # Folder to store session files (if using filesystem)
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)  # Users stay logged in for 7 days

    # ✅ CSRF Protection (Optional but recommended for security)
    WTF_CSRF_ENABLED = True
    