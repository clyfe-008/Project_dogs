from app import app, db  # Update these import statements based on your project structure
from model import User, DogHouse, Review

def seed_database():
    with app.app_context():
        # Create the database schema
        db.create_all()

        # Create and commit users
        user1 = User(username='Ngoro', email='ngoro@gmail.com', password='1957')
        user2 = User(username='Becky', email='rebe@gmail.com', password='Ndegwa7')
        user3 = User(username='Ngima', email='loise@gmail.com', password='mweri5')
        user4 = User(username='Muthoni', email='mary@gmail.com', password='kamau20')

        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)
        db.session.add(user4)
        db.session.commit()

        # Create and commit dog houses
        doghouse1 = DogHouse(name='Oloolua', address='123 Main St', average_rating=4.5, user_id=user1.id)
        doghouse2 = DogHouse(name='Bul', address='456 Elm St', average_rating=3.8, user_id=user2.id)
        doghouse3 = DogHouse(name='Green Acres', address='789 Oak St', average_rating=4.0, user_id=user3.id)
        doghouse4 = DogHouse(name='Sunny Side', address='101 Pine St', average_rating=4.2, user_id=user4.id)

        db.session.add(doghouse1)
        db.session.add(doghouse2)
        db.session.add(doghouse3)
        db.session.add(doghouse4)
        db.session.commit()

if __name__ == '__main__':
    seed_database()
