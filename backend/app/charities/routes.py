from flask import Blueprint, request, jsonify
from app.charities.services import (
    create_charity, get_charities, get_non_anonymous_donors,
    get_anonymous_donations, get_total_donations
)
from app.middleware.auth_middleware import auth_middleware
from app.charities.models import Charity

charities_routes = Blueprint('charities', __name__)

@charities_routes.route('/charities', methods=['POST'])
@auth_middleware(allowed_roles=['admin', 'charity'])  # Allow both admins and charities
def create_charity_route():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    user_id = request.user_id  # Get user_id from the authenticated user

    # Create the charity
    charity = create_charity(name, description, user_id)
    if not charity:
        return jsonify({'message': 'Failed to create charity: Invalid data or duplicate name'}), 400

    return jsonify({
        'message': 'Charity created successfully',
        'charity_id': charity.id,
        'status': charity.status  # Include status in the response
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
            'status': charity.status  # Include status in the response
        } for charity in charities]
    }), 200

@charities_routes.route('/charities/<int:charity_id>/donors', methods=['GET'])
@auth_middleware(allowed_roles=['charity', 'admin'])  # Allow charities and admins
def get_non_anonymous_donors_route(charity_id):
    donors = get_non_anonymous_donors(charity_id)
    return jsonify({
        'message': 'Non-anonymous donors retrieved successfully',
        'donors': donors
    }), 200

@charities_routes.route('/charities/<int:charity_id>/anonymous-donations', methods=['GET'])
@auth_middleware(allowed_roles=['charity', 'admin'])  # Allow charities and admins
def get_anonymous_donations_route(charity_id):
    donations = get_anonymous_donations(charity_id)
    return jsonify({
        'message': 'Anonymous donations retrieved successfully',
        'anonymous_donations': donations
    }), 200

@charities_routes.route('/charities/<int:charity_id>/total-donations', methods=['GET'])
@auth_middleware(allowed_roles=['charity', 'admin'])  # Allow charities and admins
def get_total_donations_route(charity_id):
    total = get_total_donations(charity_id)
    return jsonify({
        'message': 'Total donations retrieved successfully',
        'total_donations': total
    }), 200