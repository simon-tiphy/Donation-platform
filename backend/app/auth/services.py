from app.auth.models import User
from app import db

def register_user(name, email, password, role):
    """Register a new user."""
    # Check if the user already exists
    if User.query.filter_by(email=email).first():
        return None  # User already exists

    # Create a new user
    user = User(name=name, email=email, role=role)

    # Hash the password and save the user
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return user

def login_user(email, password):
    """Authenticate a user."""
    # Find the user by email
    user = User.query.filter_by(email=email).first()

    # Check if the user exists and the password is correct
    if user and user.check_password(password):
        return user  # Return the user if credentials are valid
    return None  # Invalid credentials