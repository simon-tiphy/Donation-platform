from datetime import datetime
from app import db

class Charity(db.Model):
    __tablename__ = "charities"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)  # ✅ Link charity to user
    name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    contact_email = db.Column(db.String(120), nullable=False, unique=True)
    status = db.Column(db.String(20), nullable=False, server_default="pending")  # pending, approved, rejected
    total_donations = db.Column(db.Float, nullable=False, default=0.0)  # ✅ Fixed default
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = db.relationship("User", back_populates="charity")  # ✅ Link to user
    donations = db.relationship("Donation", back_populates="charity", lazy="dynamic", cascade="all, delete-orphan")  
    beneficiaries = db.relationship("Beneficiary", back_populates="charity", lazy="dynamic", cascade="all, delete-orphan")
    inventory = db.relationship("Inventory", back_populates="charity", lazy="dynamic", cascade="all, delete-orphan")

    def __init__(self, user_id, name, description, contact_email, status="pending"):
        self.user_id = user_id
        self.name = name
        self.description = description
        self.contact_email = contact_email
        self.status = status

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "user_name": self.user.name if self.user else None,
            "name": self.name,
            "description": self.description,
            "contact_email": self.contact_email,
            "status": self.status,
            "total_donations": self.total_donations,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
        }


class Beneficiary(db.Model):
    __tablename__ = "beneficiaries"

    id = db.Column(db.Integer, primary_key=True)
    charity_id = db.Column(db.Integer, db.ForeignKey("charities.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    story = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Relationships
    charity = db.relationship("Charity", back_populates="beneficiaries")
    inventory = db.relationship("Inventory", back_populates="beneficiary", lazy="dynamic", cascade="all, delete-orphan")

    def __init__(self, charity_id, name, story=None):
        self.charity_id = charity_id
        self.name = name
        self.story = story

    def to_dict(self):
        return {
            "id": self.id,
            "charity_id": self.charity_id,
            "charity_name": self.charity.name if self.charity else None,
            "name": self.name,
            "story": self.story,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }


class Inventory(db.Model):
    __tablename__ = "inventory"

    id = db.Column(db.Integer, primary_key=True)
    charity_id = db.Column(db.Integer, db.ForeignKey("charities.id"), nullable=False)
    beneficiary_id = db.Column(db.Integer, db.ForeignKey("beneficiaries.id"), nullable=False)
    item_name = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    delivered_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Relationships
    charity = db.relationship("Charity", back_populates="inventory")
    beneficiary = db.relationship("Beneficiary", back_populates="inventory")

    def __init__(self, charity_id, beneficiary_id, item_name, quantity):
        self.charity_id = charity_id
        self.beneficiary_id = beneficiary_id
        self.item_name = item_name
        self.quantity = quantity

    def to_dict(self):
        return {
            "id": self.id,
            "charity_id": self.charity_id,
            "charity_name": self.charity.name if self.charity else None,
            "beneficiary_id": self.beneficiary_id,
            "beneficiary_name": self.beneficiary.name if self.beneficiary else None,
            "item_name": self.item_name,
            "quantity": self.quantity,
            "delivered_at": self.delivered_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
