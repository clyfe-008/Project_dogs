from flask import Flask, render_template, request, redirect, url_for, flash,jsonify
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
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("Database_URL")
#postgres://project_dogs_user:itFF0liDswpKOxScrk4Se6uexsm2ouN1@dpg-cke0njsiibqc73c1aqdg-a.oregon-postgres.render.com/project_dogs
db.init_app(app)

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
        # Display the details of the dog house
        return render_template('doghouse_details.html', dog_house=dog_house)
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
    # Implement editing a review
    return f"Edit review {id}"

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

@app.route('/doghouses/filter')
def doghouse_filter():
    # Implement filtering dog houses by rating
    return "Filter dog houses by rating"

if __name__ == '__main__':
    app.run(debug=True)
