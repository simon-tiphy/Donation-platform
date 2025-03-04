from flask import Blueprint, request, jsonify
from app.beneficiaries.models import Beneficiary
from app.charities.models import Charity
from app.middleware.auth_middleware import auth_middleware
from app import db

beneficiaries_routes = Blueprint('beneficiaries', __name__)

# Create a beneficiary
@beneficiaries_routes.route('/beneficiaries', methods=['POST'])
@auth_middleware(allowed_roles=['charity'])
def create_beneficiary():
    data = request.get_json()
    name = data.get('name')
    story = data.get('story')
    charity_id = request.user_id  # Get charity_id from the authenticated user

    # Validate required fields
    if not name or not story:
        return jsonify({'message': 'Name and story are required'}), 400

    # Ensure the charity exists
    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({'message': 'Charity not found'}), 404

    # Create the beneficiary
    beneficiary = Beneficiary(name=name, story=story, charity_id=charity_id)
    db.session.add(beneficiary)
    db.session.commit()

    return jsonify({
        'message': 'Beneficiary created successfully',
        'beneficiary': beneficiary.to_dict()  # Use to_dict method for response
    }), 201

# Get all beneficiaries for a charity
@beneficiaries_routes.route('/beneficiaries', methods=['GET'])
@auth_middleware(allowed_roles=['charity', 'donor', 'admin'])
def get_beneficiaries():
    charity_id = request.user_id  # Get charity_id from the authenticated user
    beneficiaries = Beneficiary.query.filter_by(charity_id=charity_id).all()

    return jsonify({
        'message': 'Beneficiaries retrieved successfully',
        'beneficiaries': [beneficiary.to_dict() for beneficiary in beneficiaries]  # Use to_dict method for response
    }), 200

# Update a beneficiary
@beneficiaries_routes.route('/beneficiaries/<int:beneficiary_id>', methods=['PUT'])
@auth_middleware(allowed_roles=['charity'])
def update_beneficiary(beneficiary_id):
    data = request.get_json()
    beneficiary = Beneficiary.query.get(beneficiary_id)

    if not beneficiary:
        return jsonify({'message': 'Beneficiary not found'}), 404

    # Ensure the beneficiary belongs to the authenticated charity
    if beneficiary.charity_id != request.user_id:
        return jsonify({'message': 'Unauthorized access'}), 403

    # Update the beneficiary
    beneficiary.name = data.get('name', beneficiary.name)
    beneficiary.story = data.get('story', beneficiary.story)
    db.session.commit()

    return jsonify({
        'message': 'Beneficiary updated successfully',
        'beneficiary': beneficiary.to_dict()  # Use to_dict method for response
    }), 200

# Delete a beneficiary
@beneficiaries_routes.route('/beneficiaries/<int:beneficiary_id>', methods=['DELETE'])
@auth_middleware(allowed_roles=['charity'])
def delete_beneficiary(beneficiary_id):
    beneficiary = Beneficiary.query.get(beneficiary_id)

    if not beneficiary:
        return jsonify({'message': 'Beneficiary not found'}), 404

    # Ensure the beneficiary belongs to the authenticated charity
    if beneficiary.charity_id != request.user_id:
        return jsonify({'message': 'Unauthorized access'}), 403

    # Delete the beneficiary
    db.session.delete(beneficiary)
    db.session.commit()

    return jsonify({
        'message': 'Beneficiary deleted successfully',
        'beneficiary_id': beneficiary.id
    }), 200