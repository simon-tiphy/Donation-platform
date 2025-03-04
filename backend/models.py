from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from datetime import datetime

db = SQLAlchemy()
bcrypt = Bcrypt()

# User Model (Parent Table for Donors and Charities)
class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(50), nullable=False)  # "donor", "charity", "admin"
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def generate_token(self):
        return create_access_token(identity={"id": self.id, "role": self.role})

# Charity Model
class Charity(db.Model):
    __tablename__ = "charities"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default="pending")  # "pending", "approved", "rejected"

    user = db.relationship("User", backref=db.backref("charity", uselist=False))

# Donor Model (Inherits from User)
class Donor(db.Model):
    __tablename__ = "donors"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    is_anonymous = db.Column(db.Boolean, default=False)

    user = db.relationship("User", backref=db.backref("donor", uselist=False))

# Donation Model
class Donation(db.Model):
    __tablename__ = "donations"
    
    id = db.Column(db.Integer, primary_key=True)
    donor_id = db.Column(db.Integer, db.ForeignKey("donors.id"), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey("charities.id"), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    is_recurring = db.Column(db.Boolean, default=False)

    donor = db.relationship("Donor", backref="donations")
    charity = db.relationship("Charity", backref="donations")

# Beneficiary Model
class Beneficiary(db.Model):
    __tablename__ = "beneficiaries"
    
    id = db.Column(db.Integer, primary_key=True)
    charity_id = db.Column(db.Integer, db.ForeignKey("charities.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    story = db.Column(db.Text, nullable=False)
    
    charity = db.relationship("Charity", backref="beneficiaries")

# Reminder Model (For Monthly Donation Reminders
class Reminder(db.Model):
    __tablename__ = "reminders"
    
    id = db.Column(db.Integer, primary_key=True)
    donor_id = db.Column(db.Integer, db.ForeignKey("donors.id"), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey("charities.id"), nullable=False)
    reminder_date = db.Column(db.DateTime, nullable=False)  # When to send reminder
    status = db.Column(db.String(50), default="pending")  # "pending", "sent"

    donor = db.relationship("Donor", backref="reminders")
    charity = db.relationship("Charity", backref="reminders")
