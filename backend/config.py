import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://myuser:mypassword@localhost/donation_db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret_key")
    ADMIN_SECRET_KEY = os.getenv("ADMIN_SECRET_KEY", "admin1234")
    
    # Additional configurations
    DEBUG = os.getenv("DEBUG", "False").lower() in ("true", "1", "yes")
    TESTING = os.getenv("TESTING", "False").lower() in ("true", "1", "yes")
