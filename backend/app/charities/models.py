from app import db
from datetime import datetime

class Charity(db.Model):
    __tablename__ = 'charities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default='pending')  # 'pending', 'approved', 'rejected'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Links to the User table
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp of creation
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # Timestamp of last update

    # Relationships
    user = db.relationship('User', back_populates='charities')  # Links to the User model
    beneficiaries = db.relationship('Beneficiary', back_populates='charity', lazy=True)  # Charity can have many beneficiaries
    donations = db.relationship('Donation', back_populates='charity', lazy=True)  # Charity can have many donations

    def __repr__(self):
        return f'<Charity id={self.id}, name={self.name}, status={self.status}>'