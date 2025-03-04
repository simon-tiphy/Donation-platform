# app/donations/routes.py
from flask import Blueprint, request, jsonify
from app.donations.services import create_donation, get_donations
from app.middleware.auth_middleware import auth_middleware

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

    donation = create_donation(donor_id, charity_id, amount, is_recurring, is_anonymous)
    if not donation:
        return jsonify({'message': 'Failed to create donation'}), 400

    return jsonify({
        'message': 'Donation created successfully',
        'donation_id': donation.id
    }), 201

@donations_routes.route('/donations', methods=['GET'])
@auth_middleware(allowed_roles=['donor', 'charity', 'admin'])
def get_donations_route():
    user_id = request.user_id
    role = request.role

    donations = get_donations(user_id, role)
    return jsonify({
        'message': 'Donations retrieved successfully',
        'donations': [{
            'id': donation.id,
            'amount': donation.amount,
            'charity_id': donation.charity_id,
            'is_recurring': donation.is_recurring,
            'is_anonymous': donation.is_anonymous,
            'date': donation.date.isoformat()
        } for donation in donations]
    }), 200