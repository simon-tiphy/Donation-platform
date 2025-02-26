from flask import Blueprint, request, jsonify
from app import db
from app.charities.models import Charity
from flask_jwt_extended import jwt_required, get_jwt_identity

charity_bp = Blueprint("charity", __name__, url_prefix="/charities")

# Apply to be a charity
@charity_bp.route("/apply", methods=["POST"])
@jwt_required()
def apply_for_charity():
    data = request.get_json()
    name = data.get("name")
    description = data.get("description")
    contact_email = data.get("contact_email")

    if not name or not description or not contact_email:
        return jsonify({"error": "Name, description, and contact email are required"}), 400

    # Check if charity name already exists
    if Charity.query.filter_by(name=name).first():
        return jsonify({"error": "Charity name already exists"}), 400

    new_charity = Charity(
        name=name,
        description=description,
        contact_email=contact_email,
        status="pending"  # Default: Not yet approved
    )

    db.session.add(new_charity)
    db.session.commit()

    return jsonify({"message": "Charity application submitted for review"}), 201

# Admin: Approve or Reject a Charity
@charity_bp.route("/approve/<int:charity_id>", methods=["PUT"])
@jwt_required()
def approve_charity(charity_id):
    data = request.get_json()
    status = data.get("status")  # Should be "approved" or "rejected"

    if status not in ["approved", "rejected"]:
        return jsonify({"error": "Status must be 'approved' or 'rejected'"}), 400

    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404

    charity.status = status
    db.session.commit()

    return jsonify({"message": f"Charity {status}"}), 200

# Get all approved charities (for donors to see)
@charity_bp.route("/approved", methods=["GET"])
def get_approved_charities():
    charities = Charity.query.filter_by(status="approved").all()
    return jsonify([charity.to_dict() for charity in charities]), 200
