from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from model import db, User, DogHouse, Review
import cloudinary
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Configure your database settings
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://project_dogs_user:itFF0liDswpKOxScrk4Se6uexsm2ouN1@dpg-cke0njsiibqc73c1aqdg-a.oregon-postgres.render.com/project_dogs'
#postgres://project_dogs_user:itFF0liDswpKOxScrk4Se6uexsm2ouN1@dpg-cke0njsiibqc73c1aqdg-a.oregon-postgres.render.com/project_dogs
db.init_app(app)  # Initialize SQLAlchemy extension after setting the URI

# Configure Cloudinary
cloudinary.config(
    cloud_name='your_cloud_name',
    api_key='your_api_key',
    api_secret='your_api_secret'
)

# Configure Flask-Login
login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)

# Flask routes:

@app.route('/')
def index():
    return "Welcome to the Dog House Finder!"

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    return "Sign up page"

@app.route('/login', methods=['GET', 'POST'])
def login():
    return "Login page"

@app.route('/logout')
@login_required
def logout():
    # Implement user logout
    return "Logout page"
@app.route('/doghouses/filter')
def doghouse_filter():
    # Query the dog houses from the database, ordered by average_rating in descending order
    dog_houses = DogHouse.query.order_by(DogHouse.average_rating.desc()).all()
    
    # Create a list to store dog house data
    dog_house_list = []
    
    # Loop through the sorted dog houses and add them to the list
    for dog_house in dog_houses:
        dog_house_data = {
            'id': dog_house.id,
            'name': dog_house.name,
            'address': dog_house.address,
            'average_rating': dog_house.average_rating
        }
        dog_house_list.append(dog_house_data)

    # Return a JSON response with the sorted dog houses
    return jsonify({'dog_houses': dog_house_list})
@app.route('/doghouses')
def doghouses():
    dog_houses = DogHouse.query.all()
    
    dog_house_list = []
    for dog_house in dog_houses:
        dog_house_data = {
            'id': dog_house.id,
            'name': dog_house.name,
            'address': dog_house.address,
            'average_rating': dog_house.average_rating
            
        }
        dog_house_list.append(dog_house_data)
    
   
    return jsonify({'dog_houses': dog_house_list})

@app.route('/doghouses/<int:id>')
def doghouse_details(id):
    dog_house = DogHouse.query.get(id)

    if dog_house is not None:
        # Create a string with the details of the dog house
        dog_house_details = f"Dog House ID: {dog_house.id}<br>"
        dog_house_details += f"Name: {dog_house.name}<br>"
        dog_house_details += f"Address: {dog_house.address}<br>"
        dog_house_details += f"Average Rating: {dog_house.average_rating}<br>"

        # Display the details of the dog house as HTML
        return dog_house_details
    else:
        # Handle the case where the dog house with the provided id does not exist
        return "Dog House not found"

@app.route('/doghouses/<int:id>/review', methods=['GET', 'POST'])
@login_required
def create_review(id):
    # Implement creating a review for a specific dog house
    return f"Create a review for Dog House {id}"

@app.route('/reviews/<int:id>/edit', methods=['GET', 'POST'])
@login_required
def edit_review(id):
    review = Review.query.get(id)

    if review is not None:
        if request.method == 'POST':
            # Update the review based on the form data
            review.content = request.form.get('content')
            db.session.commit()
            flash('Review updated successfully', 'success')
            return redirect(url_for('edit_review', id=id))

        # Render the edit review form with the current review content
        return render_template('edit_review.html', review=review)
    else:
        # Handle the case where the review with the provided id does not exist
        return "Review not found"

@app.route('/reviews/<int:id>/delete', methods=['POST'])
@login_required
def delete_review(id):
    # Implement deleting a review
    return f"Delete review {id}"

@app.route('/new_doghouse', methods=['GET', 'POST'])
@login_required
def new_doghouse():
    # Implement creating a new dog house listing
    return "Create a new dog house listing"

# Stretch goals routes

@app.route('/doghouses/map')
def doghouse_map():
    # Implement showing dog houses on a map
    return "View dog houses on a map"

@app.route('/doghouses/search')
def doghouse_search():
    # Implement searching dog houses by distance
    return "Search dog houses by distance"



if __name__ == '__main__':
    app.run(debug=True)
