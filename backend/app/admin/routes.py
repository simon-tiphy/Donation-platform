from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity  # ✅ Replace Flask-Login with JWT
from functools import wraps
from app import db
from app.auth.models import User
from app.charities.models import Charity
from app.donations.models import Donation

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


# ✅ Approve or reject a charity
@admin_bp.route("/approve/<int:charity_id>", methods=["PUT"])
@admin_required
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


# ✅ Get all users
@admin_bp.route("/users", methods=["GET"])
@admin_required
def get_all_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200


# ✅ Delete a user
@admin_bp.route("/delete_user/<int:user_id>", methods=["DELETE"])
@admin_required
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"message": f"User {user.username} deleted"}), 200  


# ✅ View all donations
@admin_bp.route("/donations", methods=["GET"])
@admin_required
def view_donations():
    donations = Donation.query.all()
    return jsonify([donation.to_dict() for donation in donations]), 200