from flask import Blueprint, request, jsonify
from app.donations.services import create_donation, get_donations
from app.middleware.auth_middleware import auth_middleware
from app.charities.models import Charity  # Import Charity model to check approval status

donations_routes = Blueprint('donations', __name__)

@donations_routes.route('/donations', methods=['POST'])
@auth_middleware(allowed_roles=['donor'])
def create_donation_route():
    data = request.get_json()
    amount = data.get('amount')
    charity_id = data.get('charity_id')
    is_recurring = data.get('is_recurring', False)
    is_anonymous = data.get('is_anonymous', False)
    donor_id = request.user_id  # Get donor_id from the authenticated user

    # Validate required fields
    if not amount or not charity_id:
        return jsonify({'message': 'Amount and charity_id are required'}), 400

    # Check if the charity exists and is approved
    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({'message': 'Charity not found'}), 404
    if charity.status != 'approved':
        return jsonify({'message': 'Charity not approved for donations'}), 403

    # Create the donation
    donation = create_donation(donor_id, charity_id, amount, is_recurring, is_anonymous)
    if not donation:
        return jsonify({'message': 'Failed to create donation'}), 400

    return jsonify({
        'message': 'Donation created successfully',
        'donation': donation.to_dict()  # Use to_dict method for response
    }), 201

@donations_routes.route('/donations', methods=['GET'])
@auth_middleware(allowed_roles=['donor', 'charity', 'admin'])
def get_donations_route():
    user_id = request.user_id
    role = request.role

    donations = get_donations(user_id, role)
    return jsonify({
        'message': 'Donations retrieved successfully',
        'donations': [donation.to_dict() for donation in donations]  # Use to_dict method for response
    }), 200