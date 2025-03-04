from flask import Blueprint, request, jsonify
from app.charities.services import create_charity, get_charities
from app.middleware.auth_middleware import auth_middleware

charities_routes = Blueprint('charities', __name__)

@charities_routes.route('/charities', methods=['POST'])
@auth_middleware(allowed_roles=['admin', 'charity'])  # Allow both admins and charities
def create_charity_route():
    # Ensure the charity is approved
    if request.role == 'charity' and request.status != 'approved':
        return jsonify({'message': 'Charity not approved'}), 403

    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    user_id = request.user_id  # Get user_id from the authenticated user

    charity = create_charity(name, description, user_id)
    if not charity:
        return jsonify({'message': 'Failed to create charity: Invalid data or duplicate name'}), 400

    return jsonify({
        'message': 'Charity created successfully',
        'charity_id': charity.id
    }), 201

@charities_routes.route('/charities', methods=['GET'])
@auth_middleware(allowed_roles=['donor', 'charity', 'admin'])  # Allow donors, charities, and admins
def get_charities_route():
    charities = get_charities()
    return jsonify({
        'message': 'Charities retrieved successfully',
        'charities': [{
            'id': charity.id,
            'name': charity.name,
            'description': charity.description,
            'approved': charity.approved
        } for charity in charities]
    }), 200