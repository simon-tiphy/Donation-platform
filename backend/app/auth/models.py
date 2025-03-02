from app import db  # ✅ Import db from app/__init__.py
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):  # ✅ Remove UserMixin (not needed for JWT)
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

    # ✅ Relationship with donations (use string-based reference)
    donations = db.relationship("Donation", back_populates="donor", cascade="all, delete-orphan")

    # ✅ Relationship with charity (use string-based reference)
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

    # ✅ JWT-specific methods
    def get_user_id(self):
        """Return the user's ID (used for JWT identity)."""
        return self.id

    def to_dict(self):
        """Return a dictionary representation of the user (useful for JWT claims)."""
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role
        } 