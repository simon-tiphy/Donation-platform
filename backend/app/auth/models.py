from app import db  # ✅ Import db from app/__init__.py
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin  # ✅ Import Flask-Login UserMixin
from app.donations.models import Donation  # ✅ Import Donation model
from app.charities.models import Charity  # ✅ Import Charity model

class User(db.Model, UserMixin):  # ✅ Inherit from UserMixin
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(
        db.Enum("donor", "charity", "admin", name="user_roles"), 
        nullable=False, 
        default="donor"
    )

    # ✅ Relationship with donations
    donations = db.relationship("Donation", back_populates="donor", cascade="all, delete-orphan")

    # ✅ Relationship with charity (for charity users)
    charity = db.relationship("Charity", back_populates="user", uselist=False)

    def __init__(self, username, email, password, role="donor"):  
        self.username = username
        self.email = email
        self.set_password(password)  # ✅ Hash password before storing
        self.role = role.lower()  # ✅ Ensure consistent lowercase roles

    def set_password(self, password):
        """Hash the password before storing it."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Check if the provided password matches the stored hash."""
        return check_password_hash(self.password_hash, password)

    # ✅ Flask-Login required methods
    def get_id(self):
        """Return the unique identifier for Flask-Login session management."""
        return str(self.id)

    @property
    def is_authenticated(self):
        """Return True if the user is authenticated."""
        return True

    @property
    def is_active(self):
        """Return True if the user account is active."""
        return True

    @property
    def is_anonymous(self):
        """Return False as this is not an anonymous user."""
        return False
