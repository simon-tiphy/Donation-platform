from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import current_app  # To access config values from Flask
from app import db, bcrypt  # Use already initialized extensions

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False)

    def set_password(self, password):
        """Hashes the password before storing it."""
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        """Checks if the provided password matches the stored hash."""
        return bcrypt.check_password_hash(self.password, password)

    @staticmethod
    def validate_admin_key(admin_key):
        """Validates the admin secret key using the app config."""
        return admin_key == current_app.config["ADMIN_SECRET_KEY"]

    def to_dict(self):
        """Returns a dictionary representation of the user (excluding password)."""
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "role": self.role
        }

    def __repr__(self):
        return f"<User {self.full_name} - {self.role}>"
