from app import db
from datetime import datetime

class Beneficiary(db.Model):
    __tablename__ = 'beneficiaries'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)  # Name of the beneficiary
    story = db.Column(db.Text, nullable=False)  # Story or description of the beneficiary
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)  # Link to the Charity table
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp of creation
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # Timestamp of last update

    # Relationship
    charity = db.relationship('Charity', back_populates='beneficiaries')  # Links to the Charity model

    def __repr__(self):
        return f"<Beneficiary id={self.id}, name={self.name}, charity_id={self.charity_id}>"

    def to_dict(self):
        """Convert the Beneficiary object to a dictionary."""
        return {
            'id': self.id,
            'name': self.name,
            'story': self.story,
            'charity_id': self.charity_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }