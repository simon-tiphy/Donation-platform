from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity  # ✅ Replace Flask-Login with JWT
from functools import wraps
from app import db
from app.auth.models import User
from app.charities.models import Charity
from app.donations.models import Donation
from app.middleware.auth_middleware import auth_middleware  # Import the auth middleware


admin_bp = Blueprint("admin", __name__, url_prefix="/admin")


# ✅ Admin role required decorator
def admin_required(f):
    @wraps(f)
    @jwt_required()  # ✅ Require a valid JWT to access this route
    def decorated_function(*args, **kwargs):
        current_user_id = get_jwt_identity()["id"]  # ✅ Get user ID from JWT
        current_user = User.query.get(current_user_id)  # ✅ Fetch user from database

        if not current_user or current_user.role != "admin":
            return jsonify({"error": "Unauthorized. Admin access required"}), 403
        return f(*args, **kwargs)
    return decorated_function


# ✅ Approve or reject a charity (organization)
@admin_bp.route("/approve_charity/<int:charity_id>", methods=["PUT"])
@auth_middleware(allowed_roles=["admin"])  # Use auth_middleware to restrict access to admins
def approve_charity(charity_id):
    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404

    data = request.get_json()
    new_status = data.get("status")  # "approved" or "rejected"

    if new_status not in ["approved", "rejected"]:
        return jsonify({"error": "Invalid status"}), 400

    charity.status = new_status
    db.session.commit()

    return jsonify({"message": f"Charity {charity.name} status updated to {new_status}"}), 200


# ✅ Approve or reject a user (charity user)
@admin_bp.route("/approve_user/<int:user_id>", methods=["PUT"])
@auth_middleware(allowed_roles=["admin"])  # Use auth_middleware to restrict access to admins
def approve_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Ensure the user is a charity
    if user.role != "charity":
        return jsonify({"error": "Only charity users can be approved"}), 400

    data = request.get_json()
    new_status = data.get("status")  # "approved" or "rejected"

    if new_status not in ["approved", "rejected"]:
        return jsonify({"error": "Invalid status"}), 400

    user.status = new_status
    db.session.commit()

    return jsonify({"message": f"User {user.name} status updated to {new_status}"}), 200


# ✅ Get all users
@admin_bp.route("/users", methods=["GET"])
@auth_middleware(allowed_roles=["admin"])  # Use auth_middleware to restrict access to admins
def get_all_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200


# ✅ Delete a user
@admin_bp.route("/delete_user/<int:user_id>", methods=["DELETE"])
@auth_middleware(allowed_roles=["admin"])  # Use auth_middleware to restrict access to admins
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"message": f"User {user.name} deleted"}), 200  # Fixed: Changed `username` to `name`


# ✅ View all donations
@admin_bp.route("/donations", methods=["GET"])
@auth_middleware(allowed_roles=["admin"])  # Use auth_middleware to restrict access to admins
def view_donations():
    donations = Donation.query.all()
    return jsonify([donation.to_dict() for donation in donations]), 200


# ✅ Delete a charity (Admin only)
@admin_bp.route("/delete_charity/<int:charity_id>", methods=["DELETE"])
@auth_middleware(allowed_roles=["admin"])  # Use auth_middleware to restrict access to admins
def delete_charity(charity_id):
    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404

    db.session.delete(charity)
    db.session.commit()

    return jsonify({"message": f"Charity {charity.name} deleted"}), 200


# ✅ Get all approved charities
@admin_bp.route("/charities/approved", methods=["GET"])
@auth_middleware(allowed_roles=["admin"])  # Use auth_middleware to restrict access to admins
def get_approved_charities():
    approved_charities = Charity.query.filter_by(status="approved").all()
    return jsonify([charity.to_dict() for charity in approved_charities]), 200


# ✅ Get all rejected charities
@admin_bp.route("/charities/rejected", methods=["GET"])
@auth_middleware(allowed_roles=["admin"])  # Use auth_middleware to restrict access to admins
def get_rejected_charities():
    rejected_charities = Charity.query.filter_by(status="rejected").all()
    return jsonify([charity.to_dict() for charity in rejected_charities]), 200


# ✅ Get all pending charities
@admin_bp.route("/charities/pending", methods=["GET"])
@auth_middleware(allowed_roles=["admin"])  # Use auth_middleware to restrict access to admins
def get_pending_charities():
    pending_charities = Charity.query.filter_by(status="pending").all()
    return jsonify([charity.to_dict() for charity in pending_charities]), 200