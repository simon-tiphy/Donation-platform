from functools import wraps
from flask import request, jsonify
from app.auth.utils import decode_token

def auth_middleware(allowed_roles=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Ensure allowed_roles is properly passed into the wrapper
            _allowed_roles = allowed_roles

            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'message': 'Token is missing'}), 401

            # Strip 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token.split(' ')[1]

            print(f"Token received: {token}")  # Debug statement

            payload = decode_token(token)
            if not payload:
                print(f"Invalid or expired token: {token}")  # Debug statement
                return jsonify({'message': 'Invalid or expired token'}), 401

            print(f"Token payload: {payload}")  # Debug statement

            # Default to all roles if allowed_roles is None
            if _allowed_roles is None:
                _allowed_roles = ['admin', 'charity', 'donor']

            # Check if the user's role is allowed
            if payload['role'] not in _allowed_roles:
                print(f"Unauthorized access: Role '{payload['role']}' not allowed")  # Debug statement
                return jsonify({'message': f"Unauthorized access: Role '{payload['role']}' not allowed"}), 403

            # Attach user info to the request object
            request.user_id = payload['user_id']
            request.role = payload['role']
            return func(*args, **kwargs)
        return wrapper
    return decorator