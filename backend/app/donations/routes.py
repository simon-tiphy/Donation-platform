from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app import db
from app.donations.models import Donation
from app.charities.models import Charity
from app.auth.models import User # Corrected from User to Users
from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler

donation_bp = Blueprint("donation", __name__, url_prefix="/donations")

# Background scheduler for recurring donations
scheduler = BackgroundScheduler()
scheduler.start()

# Function to process recurring donations
def process_recurring_donations():
    now = datetime.utcnow()
    recurring_donations = Donation.query.filter_by(is_recurring=True).all()

    for donation in recurring_donations:
        if donation.next_donation_date and donation.next_donation_date <= now:
            new_donation = Donation(
                donor_id=donation.donor_id,
                charity_id=donation.charity_id,
                amount=donation.amount,
                is_recurring=True,
                anonymous=donation.anonymous,
                next_donation_date=now + timedelta(days=30)  # Schedule next donation
            )
            db.session.add(new_donation)
            donation.next_donation_date = new_donation.next_donation_date
            db.session.commit()

# Schedule the function to run every day
scheduler.add_job(process_recurring_donations, "interval", days=1)

# Donor: Make a Donation (one-time or recurring)
@donation_bp.route("/create", methods=["POST"])
@login_required
def make_donation():
    if current_user.role != "donor":
        return jsonify({"error": "Unauthorized. Only donors can make donations."}), 403

    data = request.get_json()
    charity_id = data.get("charity_id")
    amount = data.get("amount")
    is_recurring = data.get("is_recurring", False)
    anonymous = data.get("anonymous", False)

    if not charity_id or not amount:
        return jsonify({"error": "Charity ID and amount are required"}), 400

    if amount <= 0:
        return jsonify({"error": "Donation amount must be greater than zero"}), 400

    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404

    if charity.status != "approved":
        return jsonify({"error": "Cannot donate to an unapproved charity"}), 400

    next_donation_date = datetime.utcnow() + timedelta(days=30) if is_recurring else None

    donation = Donation(
        donor_id=current_user.id,
        charity_id=charity_id,
        amount=amount,
        is_recurring=is_recurring,
        anonymous=anonymous,
        next_donation_date=next_donation_date
    )

    db.session.add(donation)
    db.session.commit()

    return jsonify({"message": "Donation successful"}), 201

# Get all Donations for an Approved Charity
@donation_bp.route("/charity/<int:charity_id>", methods=["GET"])
def get_charity_donations(charity_id):
    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404

    if charity.status != "approved":
        return jsonify({"error": "Charity is not approved"}), 400

    donations = Donation.query.filter_by(charity_id=charity_id).all()
    return jsonify([donation.to_dict() for donation in donations]), 200

# Donor: View My Donations
@donation_bp.route("/my", methods=["GET"])
@login_required
def get_my_donations():
    if current_user.role != "donor":
        return jsonify({"error": "Unauthorized. Only donors can view their donations."}), 403

    donations = Donation.query.filter_by(donor_id=current_user.id).all()
    return jsonify([donation.to_dict() for donation in donations]), 200

# Admin: View All Donations
@donation_bp.route("/", methods=["GET"])
@login_required
def get_all_donations():
    if current_user.role != "admin":
        return jsonify({"error": "Unauthorized. Only admins can view all donations."}), 403

    donations = Donation.query.all()
    return jsonify([donation.to_dict() for donation in donations]), 200

# Charity: View Non-Anonymous Donations
@donation_bp.route("/charity/<int:charity_id>/non-anonymous", methods=["GET"])
@login_required
def get_non_anonymous_donations(charity_id):
    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404

    if current_user.role != "charity":
        return jsonify({"error": "Unauthorized. Only charities can view non-anonymous donations."}), 403

    donations = Donation.query.filter_by(charity_id=charity_id, anonymous=False).all()
    return jsonify([donation.to_dict() for donation in donations]), 200
