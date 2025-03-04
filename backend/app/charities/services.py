from app.charities.models import Charity
from app import db

def create_charity(name, description, user_id):
    """Create a new charity."""
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