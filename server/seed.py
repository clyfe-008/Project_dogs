from app import app, db
from model import User, DogHouse, Review

def seed_database():
    with app.app_context():
        # Create the database schema
        db.create_all()

        # Create and commit users
        user1 = User(username='user1', email='user1@example.com', password='password1')
        user2 = User(username='user2', email='user2@example.com', password='password2')

        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()

        # Create and commit dog houses
        doghouse1 = DogHouse(name='Dog House 1', address='123 Main St', average_rating=4.5, user_id=user1.id)
        doghouse2 = DogHouse(name='Dog House 2', address='456 Elm St', average_rating=3.8, user_id=user2.id)

        db.session.add(doghouse1)
        db.session.add(doghouse2)
        db.session.commit()

if __name__ == '__main__':
    seed_database()
