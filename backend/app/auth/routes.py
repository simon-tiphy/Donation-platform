from flask import Blueprint, request, jsonify, session
from flask_login import login_user, logout_user, login_required, current_user
from app import db, login_manager
from .models import User

auth_bp = Blueprint("auth", __name__)

# Ensure unauthorized users are redirected to login
login_manager.login_view = "auth.login"


@auth_bp.route("/register", methods=["POST"])
def register():
    """Register a new user."""
    try:
        data = request.get_json()

        required_fields = {"username", "email", "password"}
        if not data or not required_fields.issubset(data):
            return jsonify({"error": "Missing required fields"}), 400

        if User.query.filter_by(email=data["email"]).first():
            return jsonify({"error": "Email already exists"}), 400

        role = data.get("role", "donor").lower()

        # Ensure password is set properly
        new_user = User(
            username=data["username"],
            email=data["email"],
            role=role,
            password=data["password"]  # Ensure password is passed in constructor if required
        )
        new_user.set_password(data["password"])  # Ensure password hashing

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": "Something went wrong", "details": str(e)}), 500


@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    """Log in a user."""
    try:
        if request.method == "GET":
            return jsonify({"message": "Please log in"}), 200  # Allows redirection to login

        data = request.get_json()

        if not data or not all(key in data for key in ("email", "password")):
            return jsonify({"error": "Missing email or password"}), 400

        user = User.query.filter_by(email=data["email"]).first()

        if user and user.check_password(data["password"]):  # Ensure hashed password check
            if not user.is_active:
                return jsonify({"error": "Account is inactive"}), 403

            login_user(user, remember=True)

            # Ensure session is correctly stored
            session.permanent = True
            session["role"] = user.role
            session.modified = True  

            return jsonify({"message": "Login successful", "user": {"id": user.id, "role": user.role}}), 200

        return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": "Something went wrong", "details": str(e)}), 500


@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    """Log out the current user."""
    logout_user()
    session.clear()  # Ensure session is fully cleared
    return jsonify({"message": "Logged out successfully"}), 200


@auth_bp.route("/current-user", methods=["GET"])
def get_current_user():
    """Get details of the currently logged-in user."""
    if not current_user.is_authenticated:
        return jsonify({"error": "User not logged in"}), 401

    return jsonify({
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "role": current_user.role
    }), 200
