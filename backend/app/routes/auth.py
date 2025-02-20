from flask import Blueprint, request, jsonify
from app.models import db, User
from app import bcrypt

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Handles user registration."""
    data = request.get_json()

    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')
    admin_key = data.get('admin_key')  # Required only for admin users

    # Ensure all required fields are present
    if not full_name or not email or not password or not role:
        return jsonify({"error": "All fields (full_name, email, password, role) are required"}), 400

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    # Validate admin role
    if role.lower() == "admin":
        if not admin_key:
            return jsonify({"error": "Admin key is required for admin registration"}), 403
        if not User.validate_admin_key(admin_key):
            return jsonify({"error": "Invalid admin key"}), 403

    # Create new user and hash password
    user = User(full_name=full_name, email=email, role=role)
    user.set_password(password)

    # Save to database
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": f"User {full_name} registered successfully!"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    """Handles user login."""
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    # Validate input
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful!",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role
        }
    }), 200

