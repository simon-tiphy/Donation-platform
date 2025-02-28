from flask import Blueprint, request, jsonify, session
from flask_login import login_user, logout_user, login_required, current_user
from app import db, login_manager  # ✅ Import login_manager from app/__init__.py
from .models import User

auth_bp = Blueprint("auth", __name__)

login_manager.login_view = "auth.login"  # Redirect to login if not authenticated


@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        if not data or not all(key in data for key in ("username", "email", "password")):
            return jsonify({"error": "Missing required fields"}), 400

        if User.query.filter_by(email=data["email"]).first():
            return jsonify({"error": "Email already exists"}), 400

        # ✅ Default role to "donor" and ensure lowercase
        role = data.get("role", "donor").lower()

        new_user = User(
            username=data["username"],
            email=data["email"],
            password=data["password"],  # ✅ Hashes password automatically
            role=role
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": "Something went wrong", "details": str(e)}), 500


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        if not data or not all(key in data for key in ("email", "password")):
            return jsonify({"error": "Missing email or password"}), 400

        user = User.query.filter_by(email=data["email"]).first()

        if user and user.check_password(data["password"]):
            if not user.is_active:  # ✅ Prevent login for inactive users
                return jsonify({"error": "Account is inactive"}), 403

            login_user(user)  # ✅ Flask-Login handles session
            
            # ✅ Store user ID in session for persistent login
            session["user_id"] = user.id
            session["role"] = user.role
            session.modified = True  # Ensure session updates
            
            return jsonify({"message": "Login successful", "user": {"id": user.id, "role": user.role}}), 200

        return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": "Something went wrong", "details": str(e)}), 500


@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()  # ✅ Logs out the user
    
    # ✅ Clear session data
    session.pop("user_id", None)
    session.pop("role", None)
    
    return jsonify({"message": "Logged out successfully"}), 200


@auth_bp.route("/current-user", methods=["GET"])
@login_required
def get_current_user():
    """Get details of the currently logged-in user."""
    return jsonify({
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "role": current_user.role
    }), 200
