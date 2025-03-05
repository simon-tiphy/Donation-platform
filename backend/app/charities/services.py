from app.charities.models import Charity
from app.donations.models import Donation
from app.auth.models import User
from app import db

def create_charity(name, description, user_id):
    """Create a new charity."""
    # Check if a charity with the same name already exists
    existing_charity = Charity.query.filter_by(name=name).first()
    if existing_charity:
        return None  # Charity with the same name already exists

    # Create the charity
    charity = Charity(
        name=name,
        description=description,
        user_id=user_id,
        status='pending'  # Default status for new charities
    )
    db.session.add(charity)
    db.session.commit()
    return charity

def get_charities():
    """Get all charities."""
    return Charity.query.all()

def get_charities_by_status(status):
    """Get charities by status (e.g., 'pending', 'approved', 'rejected')."""
    return Charity.query.filter_by(status=status).all()

def get_non_anonymous_donors(charity_id):
    """Get non-anonymous donors and their donations for a specific charity."""
    donations = Donation.query.filter_by(charity_id=charity_id, is_anonymous=False).all()
    result = []
    for donation in donations:
        donor = User.query.get(donation.donor_id)
        result.append({
            'donor': donor.to_dict(),
            'donation': donation.to_dict()
        })
    return result

def get_anonymous_donations(charity_id):
    """Get amounts donated by anonymous donors for a specific charity."""
    donations = Donation.query.filter_by(charity_id=charity_id, is_anonymous=True).all()
    return [donation.amount for donation in donations]

def get_total_donations(charity_id):
    """Get the total amount donated to a specific charity."""
    total = db.session.query(db.func.sum(Donation.amount)).filter_by(charity_id=charity_id).scalar()
    return total if total else 0.0