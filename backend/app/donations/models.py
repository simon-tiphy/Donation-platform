# app/donations/models.py
from app import db
from datetime import datetime

class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    donor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    is_recurring = db.Column(db.Boolean, default=False)
    is_anonymous = db.Column(db.Boolean, default=False)
    date = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Donation {self.id}>'

class RecurringDonation(db.Model):
    __tablename__ = 'recurring_donations'

    id = db.Column(db.Integer, primary_key=True)
    donation_id = db.Column(db.Integer, db.ForeignKey('donations.id'), nullable=False)
    frequency = db.Column(db.String(50), nullable=False)  # e.g., 'monthly'
    next_payment_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<RecurringDonation {self.id}>'