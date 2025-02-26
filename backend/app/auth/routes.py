from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app import db
from .models import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        if not data or not all(key in data for key in ("username", "email", "password")):
            return jsonify({"error": "Missing required fields"}), 400

        if "role" not in data:
            data["role"] = "donor"

        if User.query.filter_by(email=data["email"]).first():
            return jsonify({"error": "Email already exists"}), 400

        new_user = User(
            username=data["username"],
            email=data["email"],
            password=data["password"],  # Fixed missing password
            role=data["role"].lower()
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
            access_token = create_access_token(identity={"id": user.id, "role": user.role})
            return jsonify({"access_token": access_token, "role": user.role}), 200

        return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": "Something went wrong", "details": str(e)}), 500
