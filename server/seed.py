from app import app, db
from model import User, DogHouse, Review
from faker import Faker
import random

fake = Faker()

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

        # Create and commit dog houses with random ratings
        dog_houses = []
        for _ in range(10):
            name = fake.company()
            address = fake.address()
            average_rating = round(random.uniform(3.0, 5.0), 1)
            user_id = random.choice(users).id
            dog_house = DogHouse(name=name, address=address, average_rating=average_rating, user_id=user_id)
            dog_houses.append(dog_house)

        db.session.add_all(dog_houses)
        db.session.commit()

if __name__ == '__main__':
    seed_database()
