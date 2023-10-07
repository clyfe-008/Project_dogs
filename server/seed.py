from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from model import User, DogHouse
from faker import Faker
import random

fake = Faker()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://project_dogs_user:itFF0liDswpKOxScrk4Se6uexsm2ouN1@dpg-cke0njsiibqc73c1aqdg-a.oregon-postgres.render.com/project_dogs'
db = SQLAlchemy(app)

# Function to generate a random image URL (you can replace this with a real image service)
def generate_random_image_url():
    return f"https://example.com/doghouse-image/{random.randint(1, 100)}.jpg"

def seed_database():
    with app.app_context():
        db.create_all()

        # Create and commit users
        users = []
        for _ in range(10):
            username = fake.user_name()
            email = fake.email()
            password = fake.password()
            user = User(username=username, email=email, password=password)
            users.append(user)

        db.session.add_all(users)
        db.session.commit()

        # Create and commit dog houses with random ratings and image URLs
        dog_houses = []
        for _ in range(10):
            name = fake.company()
            address = fake.address()
            average_rating = round(random.uniform(3.0, 5.0), 1)
            user_id = random.choice(users).id
            image_url = generate_random_image_url()  # Generate a random image URL
            dog_house = DogHouse(name=name, address=address, average_rating=average_rating, user_id=user_id, image_url=image_url)
            dog_houses.append(dog_house)

        db.session.add_all(dog_houses)
        db.session.commit()

if __name__ == '__main__':
    seed_database()
