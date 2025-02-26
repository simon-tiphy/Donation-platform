from app import db  # ✅ Import db from app/__init__.py
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
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

    def __init__(self, username, email, password, role="donor"):  # ✅ Constructor added
        self.username = username
        self.email = email
        self.set_password(password)  # ✅ Hash password before storing
        self.role = role

    def set_password(self, password):
        """Hash the password before storing it."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Check if the provided password matches the stored hash."""
        return check_password_hash(self.password_hash, password)
