from datetime import datetime
from app import db

class Charity(db.Model):
    __tablename__ = "charities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    contact_email = db.Column(db.String(120), nullable=False, unique=True)  # Added this
    status = db.Column(db.String(20), default="pending")  # pending, approved, rejected
    total_donations = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, name, description, contact_email, status="pending"):
        self.name = name
        self.description = description
        self.contact_email = contact_email  # Added this
        self.status = status  # Optional, defaults to "pending"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "contact_email": self.contact_email,  # Added this
            "status": self.status,
            "total_donations": self.total_donations,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
