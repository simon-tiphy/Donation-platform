import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://donation_user:yourpassword@localhost:5432/donation_platform")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your_jwt_secret_key")
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")