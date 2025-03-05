from app.donations.models import Donation, RecurringDonation
from app import db
from datetime import datetime, timedelta

def create_donation(donor_id, charity_id, amount, is_recurring, is_anonymous):
    """Create a new donation."""
    donation = Donation(
        amount=amount,
        donor_id=donor_id,
        charity_id=charity_id,
        is_recurring=is_recurring,
        is_anonymous=is_anonymous
    )
    db.session.add(donation)
    db.session.commit()

    if is_recurring:
        # Create a recurring donation record
        recurring_donation = RecurringDonation(
            donation_id=donation.id,
            frequency='monthly',  # Default to monthly
            next_payment_date=calculate_next_payment_date()  # Implement this function
        )
        db.session.add(recurring_donation)
        db.session.commit()

    return donation

def get_donations(user_id, role):
    """Get donations based on user role."""
    if role == 'donor':
        donations = Donation.query.filter_by(donor_id=user_id).all()
    elif role == 'charity':
        donations = Donation.query.filter_by(charity_id=user_id).all()
    elif role == 'admin':
        donations = Donation.query.all()
    else:
        donations = []

    return donations  # Return a list of Donation objects

def calculate_next_payment_date():
    """Calculate the next payment date for recurring donations."""
    return datetime.utcnow() + timedelta(days=30)  # Default to 30 days