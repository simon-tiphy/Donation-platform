import os

DATABASE_URL = "postgresql://donate_it_user:w60Z0r3s3e1qHzgEnvOkH6FAvcKVuZuy@dpg-cv3ck2btq21c73bjal4g-a.oregon-postgres.render.com/donate_it"

class Config:
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "your_secret_key"  # Change this for security
    JWT_SECRET_KEY = "your_jwt_secret_key"
