from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from .models import User

auth_bp = Blueprint("auth", __name__)


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

        # Create new user
        new_user = User(
            username=data["username"],
            email=data["email"],
            role=role,
            password=data["password"]  # Password will be hashed in the constructor
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": "Something went wrong", "details": str(e)}), 500


@auth_bp.route("/login", methods=["POST"])
def login():
    """Log in a user and return a JWT."""
    try:
        data = request.get_json()

        if not data or not all(key in data for key in ("email", "password")):
            return jsonify({"error": "Missing email or password"}), 400

        user = User.query.filter_by(email=data["email"]).first()

        if user and user.check_password(data["password"]):
            # Create JWT token
            access_token = create_access_token(identity=user.to_dict())
            return jsonify({
                "message": "Login successful",
                "access_token": access_token,
                "user": user.to_dict()
            }), 200

        return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": "Something went wrong", "details": str(e)}), 500


@auth_bp.route("/logout", methods=["POST"])
@jwt_required()  # Require a valid JWT to access this route
def logout():
    """Log out the current user (JWT is stateless, so this is just a placeholder)."""
    # JWT is stateless, so there's no server-side logout. You can invalidate the token client-side.
    return jsonify({"message": "Logged out successfully"}), 200


@auth_bp.route("/current-user", methods=["GET"])
@jwt_required()  # Require a valid JWT to access this route
def get_current_user():
    """Get details of the currently logged-in user."""
    current_user = get_jwt_identity()  # Get the user identity from the JWT
    return jsonify(current_user), 200