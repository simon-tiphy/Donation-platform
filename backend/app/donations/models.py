from datetime import datetime
from app import db

class Donation(db.Model):
    __tablename__ = "donations"

    id = db.Column(db.Integer, primary_key=True)
    donor_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey("charities.id"), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    is_recurring = db.Column(db.Boolean, default=False)
    anonymous = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # ✅ Update relationships (use string-based references)
    donor = db.relationship("User", back_populates="donations")
    charity = db.relationship("Charity", back_populates="donations")

    def __init__(self, donor_id, charity_id, amount, is_recurring=False, anonymous=False):
        self.donor_id = donor_id
        self.charity_id = charity_id
        self.amount = amount
        self.is_recurring = is_recurring
        self.anonymous = anonymous

        # ✅ Auto-update charity's total donations
        charity = db.session.get(db.Model.metadata.tables["charities"], charity_id)
        if charity:
            charity.total_donations += amount
            db.session.add(charity)

    def to_dict(self):
        """Return a dictionary representation of the Donation object."""
        return {
            "id": self.id,
            "donor_id": None if self.anonymous else self.donor_id,
            "donor_name": None if self.anonymous else (self.donor.username if self.donor else None),  # ✅ Include donor name
            "charity_id": self.charity_id,
            "charity_name": self.charity.name if self.charity else None,
            "amount": self.amount,
            "is_recurring": self.is_recurring,
            "anonymous": self.anonymous,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }