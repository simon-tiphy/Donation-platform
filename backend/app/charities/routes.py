from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app import db
from app.charities.models import Charity, Beneficiary, Inventory

charity_bp = Blueprint("charity", __name__, url_prefix="/charities")

# ------------------------------ CHARITIES ------------------------------ #

# ✅ Get all charities (for debugging & general listing)
@charity_bp.route("/", methods=["GET"])
def get_all_charities():
    charities = Charity.query.all()
    return jsonify([charity.to_dict() for charity in charities]), 200

# ✅ Get only approved charities (for donors)
@charity_bp.route("/approved", methods=["GET"])
def get_approved_charities():
    charities = Charity.query.filter_by(status="approved").all()
    return jsonify([charity.to_dict() for charity in charities]), 200

# ✅ Get the currently logged-in user's charity application
@charity_bp.route("/my-charity", methods=["GET"])
@login_required
def get_my_charity():
    charity = Charity.query.filter_by(user_id=current_user.id).first()
    if not charity:
        return jsonify({"error": "No charity application found for this user"}), 404
    return jsonify(charity.to_dict()), 200

# ✅ Apply to be a charity (Only one application per user)
@charity_bp.route("/apply", methods=["POST"])
@login_required
def apply_for_charity():
    if current_user.role != "charity":
        return jsonify({"error": "Unauthorized. Only charity users can apply."}), 403

    if Charity.query.filter_by(user_id=current_user.id).first():
        return jsonify({"error": "You have already applied for a charity"}), 400

    data = request.get_json()
    name = data.get("name", "").strip()
    description = data.get("description", "").strip()
    contact_email = data.get("contact_email", "").strip()

    if not name or not description or not contact_email:
        return jsonify({"error": "Name, description, and contact email are required"}), 400

    new_charity = Charity(
        name=name,
        description=description,
        contact_email=contact_email,
        user_id=current_user.id,
        status="pending"
    )

    db.session.add(new_charity)
    db.session.commit()

    return jsonify({"message": "Charity application submitted for review"}), 201

# ------------------------------ BENEFICIARIES ------------------------------ #

# ✅ Add a beneficiary (Only charities can add beneficiaries)
@charity_bp.route("/<int:charity_id>/beneficiaries", methods=["POST"])
@login_required
def add_beneficiary(charity_id):
    charity = Charity.query.get_or_404(charity_id)

    if current_user.role != "charity" or charity.user_id != current_user.id:
        return jsonify({"error": "Unauthorized. Only the charity owner can add beneficiaries."}), 403

    if charity.status != "approved":
        return jsonify({"error": "Your charity is not approved yet."}), 403

    data = request.get_json()
    name = data.get("name", "").strip()
    story = data.get("story", "").strip()

    if not name:
        return jsonify({"error": "Beneficiary name is required"}), 400

    new_beneficiary = Beneficiary(charity_id=charity_id, name=name, story=story)
    db.session.add(new_beneficiary)
    db.session.commit()

    return jsonify({"message": "Beneficiary added successfully", "beneficiary": new_beneficiary.to_dict()}), 201

# ✅ Get all beneficiaries of a charity
@charity_bp.route("/<int:charity_id>/beneficiaries", methods=["GET"])
def get_beneficiaries(charity_id):
    Beneficiary.query.get_or_404(charity_id)
    beneficiaries = Beneficiary.query.filter_by(charity_id=charity_id).all()
    return jsonify([b.to_dict() for b in beneficiaries]), 200

# ✅ Update a beneficiary
@charity_bp.route("/<int:charity_id>/beneficiaries/<int:beneficiary_id>", methods=["PUT"])
@login_required
def update_beneficiary(charity_id, beneficiary_id):
    charity = Charity.query.get_or_404(charity_id)
    
    if current_user.role != "charity" or charity.user_id != current_user.id:
        return jsonify({"error": "Unauthorized."}), 403

    beneficiary = Beneficiary.query.get_or_404(beneficiary_id)
    if beneficiary.charity_id != charity_id:
        return jsonify({"error": "Beneficiary does not belong to this charity."}), 404

    data = request.get_json()
    beneficiary.name = data.get("name", beneficiary.name).strip()
    beneficiary.story = data.get("story", beneficiary.story).strip()

    db.session.commit()
    return jsonify({"message": "Beneficiary updated successfully", "beneficiary": beneficiary.to_dict()}), 200

# ✅ Delete a beneficiary
@charity_bp.route("/<int:charity_id>/beneficiaries/<int:beneficiary_id>", methods=["DELETE"])
@login_required
def delete_beneficiary(charity_id, beneficiary_id):
    charity = Charity.query.get_or_404(charity_id)

    if current_user.role != "charity" or charity.user_id != current_user.id:
        return jsonify({"error": "Unauthorized."}), 403

    beneficiary = Beneficiary.query.get_or_404(beneficiary_id)
    if beneficiary.charity_id != charity_id:
        return jsonify({"error": "Beneficiary does not belong to this charity."}), 404

    db.session.delete(beneficiary)
    db.session.commit()

    return jsonify({"message": "Beneficiary deleted successfully"}), 200

# ------------------------------ INVENTORY ------------------------------ #

# ✅ Add inventory for a beneficiary
@charity_bp.route("/<int:charity_id>/inventory", methods=["POST"])
@login_required
def add_inventory(charity_id):
    charity = Charity.query.get_or_404(charity_id)

    if current_user.role != "charity" or charity.user_id != current_user.id:
        return jsonify({"error": "Unauthorized."}), 403

    data = request.get_json()
    beneficiary_id = data.get("beneficiary_id")
    item_name = data.get("item_name", "").strip()
    quantity = data.get("quantity")

    if not all([beneficiary_id, item_name, quantity]):
        return jsonify({"error": "Beneficiary ID, item name, and quantity are required"}), 400

    beneficiary = Beneficiary.query.get_or_404(beneficiary_id)
    if beneficiary.charity_id != charity_id:
        return jsonify({"error": "Beneficiary does not belong to this charity."}), 404

    new_inventory = Inventory(charity_id=charity_id, beneficiary_id=beneficiary_id, item_name=item_name, quantity=quantity)
    db.session.add(new_inventory)
    db.session.commit()

    return jsonify({"message": "Inventory added successfully", "inventory": new_inventory.to_dict()}), 201

# ✅ Get inventory for a charity
@charity_bp.route("/<int:charity_id>/inventory", methods=["GET"])
def get_inventory(charity_id):
    Inventory.query.get_or_404(charity_id)
    inventory_items = Inventory.query.filter_by(charity_id=charity_id).all()
    return jsonify([item.to_dict() for item in inventory_items]), 200

# ✅ Delete inventory
@charity_bp.route("/<int:charity_id>/inventory/<int:inventory_id>", methods=["DELETE"])
@login_required
def delete_inventory(charity_id, inventory_id):
    inventory = Inventory.query.get_or_404(inventory_id)
    db.session.delete(inventory)
    db.session.commit()

    return jsonify({"message": "Inventory deleted successfully"}), 200
