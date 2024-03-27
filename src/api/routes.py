from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from api.models import db, User
from api.utils import APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if user is None: 
        return jsonify({"msg": "Bad email or password"}), 401
    
    if password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    response = jsonify(access_token=access_token)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@api.route("/signup", methods=["POST"])
def sign_up():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Validate email and password here
    # You might want to add more validation, such as password strength checks

    # Check if the email is already registered
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "Email already registered"}), 400

    # Create a new user
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    response = jsonify({"msg": "User created successfully"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    dictionary = {
        "message": "hello world"
    }
    response = jsonify(dictionary)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@api.route("/private", methods=["GET"])
@jwt_required()
def get_private():
    current_user_email = get_jwt_identity()
    # Here you can retrieve user data based on current_user_email if needed
    message = {"message": f"Hello {current_user_email}, this is a private page!"}
    response = jsonify(message)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@api.route('/', methods=['OPTIONS'])
@api.route('/<path:path>', methods=['OPTIONS'])
def handle_preflight_request(path=None):
    response = jsonify()
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    return response
