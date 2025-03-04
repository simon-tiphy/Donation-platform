from app import db
from datetime import datetime

class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    donor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Links to the User table
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)  # Links to the Charity table
    is_recurring = db.Column(db.Boolean, default=False)
    is_anonymous = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp of creation
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # Timestamp of last update

    # Relationships
    donor = db.relationship('User', back_populates='donations')  # Links to the User model
    charity = db.relationship('Charity', back_populates='donations')  # Links to the Charity model
    recurring_donations = db.relationship('RecurringDonation', back_populates='donation', lazy=True)  # Links to RecurringDonation model

    def __repr__(self):
        return f'<Donation id={self.id}, amount={self.amount}, donor_id={self.donor_id}, charity_id={self.charity_id}>'

    def to_dict(self):
        """Convert the Donation object to a dictionary."""
        return {
            'id': self.id,
            'amount': self.amount,
            'donor_id': self.donor_id,
            'charity_id': self.charity_id,
            'is_recurring': self.is_recurring,
            'is_anonymous': self.is_anonymous,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class RecurringDonation(db.Model):
    __tablename__ = 'recurring_donations'

    id = db.Column(db.Integer, primary_key=True)
    donation_id = db.Column(db.Integer, db.ForeignKey('donations.id'), nullable=False)
    frequency = db.Column(db.String(50), nullable=False)  # e.g., 'monthly'
    next_payment_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp of creation
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # Timestamp of last update

    # Relationship
    donation = db.relationship('Donation', back_populates='recurring_donations')

    def __repr__(self):
        return f'<RecurringDonation id={self.id}, donation_id={self.donation_id}, frequency={self.frequency}, next_payment_date={self.next_payment_date}>'

    def to_dict(self):
        """Convert the RecurringDonation object to a dictionary."""
        return {
            'id': self.id,
            'donation_id': self.donation_id,
            'frequency': self.frequency,
            'next_payment_date': self.next_payment_date.isoformat() if self.next_payment_date else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }