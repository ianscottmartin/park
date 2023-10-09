#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Review, Park

if __name__ == "__main__":
    fake = Faker()

    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Deleting all records...")
        User.query.delete()
        Review.query.delete()
        Park.query.delete()

        print("Creating users...")
        # to create unique usernames
        users = []
        usernames = []

        for _ in range(10):
            username = fake.simple_profile()["username"]
            while username in usernames:
                username = fake.simple_profile()["username"]
            usernames.append(username)

            user = User(
                username=username,
                bio=fake.paragraph(nb_sentences=2),
            )

            user.password_hash = user.username + "pass"

            users.append(user)
        db.session.add_all(users)
        db.session.commit()

        print("Creating ...")
        # create Parks
        parks = [
            Park(
                destination="Great Sand Dunes",
                entry_fee=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
            ),
            Park(
                destination="Yosemite",
                entry_fee=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
            ),
            Park(
                destination="Canyon Lands",
                entry_fee=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
            ),
            Park(
                destination="Goblin Valley",
                entry_fee=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
            ),
            Park(
                destination="Grand Canyon",
                entry_fee=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
            ),
            Park(
                destination="Arches National Park",
                entry_fee=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
            ),
            Park(
                destination="Red Forest",
                entry_fee=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
            ),
            Park(
                destination="Bryce",
                entry_fee=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
            ),
            Park(
                destination="Zion",
                entry_fee=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
            ),
            Park(
                destination="Rocky Mountain National Park",
                entry_fee=randint(100, 4000),
                description=fake.paragraph(nb_sentences=4),
            ),
        ]

        db.session.add_all(parks)
        db.session.commit()

        print("Creating reviews...")
        # create reviews
        reviews = []

        for _ in range(20):
            # choose a random user
            user = rc(users)
            park = rc(parks)
            review_data = Review(
                review=fake.sentence(nb_words=7), user_id=user.id, park_id=park.id
            )
            reviews.append(review_data)
        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding complete")
