from flask import Blueprint, request, jsonify
from app.auth.services import register_user, login_user
from app.auth.utils import generate_token

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'donor')  # Default role is 'donor'

    user = register_user(name, email, password, role)
    if not user:
        return jsonify({'message': 'User already exists'}), 400

    return jsonify({
        'message': 'User registered successfully',
        'user_id': user.id,
        'role': user.role,
        'status': user.status  # Include status in the response
    }), 201

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = login_user(email, password)
    if not user:
        return jsonify({'message': 'Invalid credentials or charity not approved'}), 401

    token = generate_token(user.id, user.role)
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user_id': user.id,
        'role': user.role,
        'status': user.status  # Include status in the response
    }), 200