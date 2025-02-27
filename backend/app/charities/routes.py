from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app import db
from app.charities.models import Charity, Beneficiary, Inventory
from app.auth.models import User  

charity_bp = Blueprint("charity", __name__, url_prefix="/charities")


# Apply to be a charity (Only one application per user)
@charity_bp.route("/apply", methods=["POST"])
@login_required
def apply_for_charity():
    if current_user.role != "charity":
        return jsonify({"error": "Unauthorized. Only charity users can apply."}), 403

    data = request.get_json()
    name = data.get("name")
    description = data.get("description")
    contact_email = data.get("contact_email")

    if not name or not description or not contact_email:
        return jsonify({"error": "Name, description, and contact email are required"}), 400

    # Ensure user doesn't already have a charity
    existing_charity = Charity.query.filter_by(user_id=current_user.id).first()
    if existing_charity:
        return jsonify({"error": "You have already applied for a charity"}), 400

    new_charity = Charity(
        name=name,
        description=description,
        contact_email=contact_email,
        user_id=current_user.id,  # ✅ Store user_id
        status="pending"
    )

    db.session.add(new_charity)
    db.session.commit()

    return jsonify({"message": "Charity application submitted for review"}), 201


# Admin: Approve or Reject a Charity
@charity_bp.route("/approve/<int:charity_id>", methods=["PUT"])
@login_required
def approve_charity(charity_id):
    if current_user.role != "admin":
        return jsonify({"error": "Unauthorized. Only admins can approve charities."}), 403

    data = request.get_json()
    status = data.get("status")  

    if status not in ["approved", "rejected"]:
        return jsonify({"error": "Status must be 'approved' or 'rejected'"}), 400

    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404

    charity.status = status
    db.session.commit()

    return jsonify({"message": f"Charity {status}"}), 200


# Get all approved charities (for donors)
@charity_bp.route("/approved", methods=["GET"])
def get_approved_charities():
    charities = Charity.query.filter_by(status="approved").all()
    return jsonify([charity.to_dict() for charity in charities]), 200


# Get all charities (for admins)
@charity_bp.route("/", methods=["GET"])
@login_required
def get_all_charities():
    if current_user.role != "admin":
        return jsonify({"error": "Unauthorized. Only admins can view all charities."}), 403

    charities = Charity.query.all()
    return jsonify([charity.to_dict() for charity in charities]), 200


# ------------------------------ BENEFICIARIES ------------------------------ #

# Add a beneficiary (Only charities can add beneficiaries)
@charity_bp.route("/<int:charity_id>/beneficiaries", methods=["POST"])
@login_required
def add_beneficiary(charity_id):
    charity = Charity.query.get(charity_id)

    if current_user.role != "charity" or charity.user_id != current_user.id:
        return jsonify({"error": "Unauthorized. Only the charity owner can add beneficiaries."}), 403

    if not charity or charity.status != "approved":
        return jsonify({"error": "Charity not found or not approved."}), 404

    data = request.get_json()
    name = data.get("name")
    story = data.get("story")

    if not name:
        return jsonify({"error": "Beneficiary name is required"}), 400

    new_beneficiary = Beneficiary(charity_id=charity_id, name=name, story=story)
    db.session.add(new_beneficiary)
    db.session.commit()

    return jsonify({"message": "Beneficiary added successfully", "beneficiary": new_beneficiary.to_dict()}), 201


# Get all beneficiaries of a charity
@charity_bp.route("/<int:charity_id>/beneficiaries", methods=["GET"])
def get_beneficiaries(charity_id):
    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404

    beneficiaries = Beneficiary.query.filter_by(charity_id=charity_id).all()
    return jsonify([b.to_dict() for b in beneficiaries]), 200


# ------------------------------ INVENTORY ------------------------------ #

# Add inventory for a beneficiary (Only charities can send inventory)
@charity_bp.route("/<int:charity_id>/inventory", methods=["POST"])
@login_required
def add_inventory(charity_id):
    charity = Charity.query.get(charity_id)

    if current_user.role != "charity" or charity.user_id != current_user.id:
        return jsonify({"error": "Unauthorized. Only the charity owner can add inventory."}), 403

    if not charity or charity.status != "approved":
        return jsonify({"error": "Charity not found or not approved."}), 404

    data = request.get_json()
    beneficiary_id = data.get("beneficiary_id")
    item_name = data.get("item_name")
    quantity = data.get("quantity")

    if not beneficiary_id or not item_name or not quantity:
        return jsonify({"error": "Beneficiary ID, item name, and quantity are required"}), 400

    beneficiary = Beneficiary.query.get(beneficiary_id)
    if not beneficiary or beneficiary.charity_id != charity_id:
        return jsonify({"error": "Beneficiary not found or does not belong to this charity."}), 404

    new_inventory = Inventory(
        charity_id=charity_id,
        beneficiary_id=beneficiary_id,
        item_name=item_name,
        quantity=quantity
    )

    db.session.add(new_inventory)
    db.session.commit()

    return jsonify({"message": "Inventory added successfully", "inventory": new_inventory.to_dict()}), 201


# Get inventory for a charity
@charity_bp.route("/<int:charity_id>/inventory", methods=["GET"])
def get_inventory(charity_id):
    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404

    inventory_items = Inventory.query.filter_by(charity_id=charity_id).all()
    return jsonify([item.to_dict() for item in inventory_items]), 200


# Get inventory for a specific beneficiary
@charity_bp.route("/<int:charity_id>/beneficiaries/<int:beneficiary_id>/inventory", methods=["GET"])
def get_beneficiary_inventory(charity_id, beneficiary_id):
    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404

    beneficiary = Beneficiary.query.get(beneficiary_id)
    if not beneficiary or beneficiary.charity_id != charity_id:
        return jsonify({"error": "Beneficiary not found or does not belong to this charity."}), 404

    inventory_items = Inventory.query.filter_by(beneficiary_id=beneficiary_id).all()
    return jsonify([item.to_dict() for item in inventory_items]), 200
