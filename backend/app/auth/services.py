from app.auth.models import User
from app import db

def register_user(name, email, password, role):
    """Register a new user."""
    # Check if the user already exists
    if User.query.filter_by(email=email).first():
        return None  # User already exists

    # Create a new user
    user = User(name=name, email=email, role=role)

    # Set status to 'pending' for charities
    if role == 'charity':
        user.status = 'pending'
    elif role == 'admin' or 'donor':
        user.status= 'approved' 
     # Default status for charities

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
        # Check if the user is a charity and their status is approved
        if user.role == 'charity' and user.status != 'approved':
            return None  # Charity is not approved
        return user
    return None  # Invalid credentials