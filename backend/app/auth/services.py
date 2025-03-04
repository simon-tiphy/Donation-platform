from app.auth.models import User
from app import db

def register_user(name, email, password, role):
    """Register a new user."""
    if User.query.filter_by(email=email).first():
        return None  # User already exists

    user = User(name=name, email=email, role=role)

    # Set status to 'pending' for charities
    if role == 'charity':
        user.status = 'pending'  # Default status for charities

    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return user

def login_user(email, password):
    """Authenticate a user."""
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        # Check if the user is a charity and their status is approved
        if user.role == 'charity' and user.status != 'approved':
            return None  # Charity is not approved
        return user
    return None  # Invalid credentials