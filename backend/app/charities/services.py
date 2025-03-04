# app/charities/services.py
from app.charities.models import Charity
from app import db

def create_charity(name, description, user_id):
    """Create a new charity."""
    charity = Charity(
        name=name,
        description=description,
        user_id=user_id,
        approved=False  # Default to False, must be approved by admin
    )
    db.session.add(charity)
    db.session.commit()
    return charity

def get_charities():
    """Get all charities."""
    return Charity.query.all()