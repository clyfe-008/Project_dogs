from flask import Flask,jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import Flask, jsonify, request
from models import db, DogHouse, User, Review


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Dogs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)


# 1. GET doghouses and their reviews
@app.route('/doghouses', methods=['GET'])
def get_doghouses():
    doghouses = DogHouse.query.all()
    doghouse_data = [{'id': doghouse.id, 'name': doghouse.name, 'reviews': [review.serialize() for review in doghouse.reviews]} for doghouse in doghouses]
    return jsonify(doghouse_data)

# 2. Allow a user to POST a review
@app.route('/reviews', methods=['POST'])
def post_review():
    data = request.get_json()
    user_id = data.get('user_id')
    doghouse_id = data.get('doghouse_id')
    content = data.get('content')

    review = Review(user_id=user_id, doghouse_id=doghouse_id, content=content)
    db.session.add(review)
    db.session.commit()

    return jsonify({'message': 'Review posted successfully'}), 201

# 3. Allow a user to PATCH a review
@app.route('/reviews/<int:review_id>', methods=['PATCH'])
def patch_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return jsonify({'error': 'Review not found'}), 404

    data = request.get_json()
    review.content = data.get('content', review.content)
    db.session.commit()

    return jsonify(review.serialize())

# 4. Allow a user to DELETE a review
@app.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return jsonify({'error': 'Review not found'}), 404

    db.session.delete(review)
    db.session.commit()

    return jsonify({'message': 'Review deleted successfully'})

# 5. Allow a user to POST a doghouse
@app.route('/doghouses', methods=['POST'])
def post_doghouse():
    data = request.get_json()
    name = data.get('name')
    address = data.get('address')
    description = data.get('description')

    doghouse = DogHouse(name=name, address=address, description=description)
    db.session.add(doghouse)
    db.session.commit()

    return jsonify({'message': 'Doghouse posted successfully'}), 201

# 6. Creating a user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')

    user = User(name=name, email=email)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True)

