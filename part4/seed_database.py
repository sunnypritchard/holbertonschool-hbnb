#!/usr/bin/env python3
"""
Database Seeding Script

This script seeds the database with initial data:
- 1 admin user
- 2 normal users
- 3 places (owned by the normal users)
- 5 amenities

Run this script to populate the database with test data.
"""

from app import create_app, db
from app.services import facade


def seed_database():
    """
    Seeds initial data for the application.

    Creates:
    - 1 admin user (admin@hbnb.io)
    - 2 normal users (john.doe@example.com, jane.smith@example.com)
    - 3 places with different prices
    - 5 amenities
    """
    app = create_app()

    with app.app_context():
        # Check if data already exists
        all_users = facade.get_all_users()
        if len(all_users) > 0:
            print("⚠️  Database already contains data. Skipping seed.")
            print(f"   Found {len(all_users)} users in database.")
            return

        print("🌱 Seeding database with initial data...\n")

        # 1. Create admin user
        print("👤 Creating admin user...")
        admin_data = {
            'first_name': app.config.get('ADMIN_FIRST_NAME', 'Admin'),
            'last_name': app.config.get('ADMIN_LAST_NAME', 'HBnB'),
            'email': app.config.get('ADMIN_EMAIL', 'admin@hbnb.io'),
            'password': app.config.get('ADMIN_PASSWORD', 'admin1234'),
            'is_admin': True
        }
        admin_user = facade.create_user(admin_data)
        print(f"   ✓ Admin: {admin_data['email']}")

        # 2. Create 2 normal users
        print("\n👥 Creating normal users...")
        user1_data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'john.doe@example.com',
            'password': 'password123',
            'is_admin': False
        }

        user2_data = {
            'first_name': 'Jane',
            'last_name': 'Smith',
            'email': 'jane.smith@example.com',
            'password': 'password123',
            'is_admin': False
        }

        user1 = facade.create_user(user1_data)
        print(f"   ✓ User: {user1_data['email']}")

        user2 = facade.create_user(user2_data)
        print(f"   ✓ User: {user2_data['email']}")

        # 3. Create 5 amenities
        print("\n🏠 Creating amenities...")
        amenities_data = ['WiFi', 'Swimming Pool', 'Parking', 'Kitchen', 'Air Conditioning']
        amenities = {}

        for amenity_name in amenities_data:
            amenity = facade.create_amenity({'name': amenity_name})
            amenities[amenity_name] = amenity.id
            print(f"   ✓ {amenity_name}")

        # 4. Create 3 places with hardcoded prices
        print("\n🏡 Creating places...")
        places_data = [
            {
                'title': 'Cozy Beach House',
                'description': 'A beautiful beach house with stunning ocean views. Perfect for a relaxing vacation by the sea.',
                'price': 150.0,  # Hardcoded price
                'latitude': 34.0522,
                'longitude': -118.2437,
                'owner_id': user1.id,
                'amenities': [amenities.get('WiFi'), amenities.get('Kitchen'), amenities.get('Air Conditioning')]
            },
            {
                'title': 'Modern City Apartment',
                'description': 'Modern apartment in the heart of the city. Close to restaurants, shops, and entertainment.',
                'price': 200.0,  # Hardcoded price
                'latitude': 37.7749,
                'longitude': -122.4194,
                'owner_id': user1.id,
                'amenities': [amenities.get('WiFi'), amenities.get('Air Conditioning'), amenities.get('Parking')]
            },
            {
                'title': 'Mountain Cabin Retreat',
                'description': 'Cozy cabin in the mountains. Perfect for a weekend getaway with nature and fresh air.',
                'price': 100.0,  # Hardcoded price
                'latitude': 40.7608,
                'longitude': -111.8910,
                'owner_id': user2.id,
                'amenities': [amenities.get('WiFi'), amenities.get('Kitchen'), amenities.get('Parking')]
            }
        ]

        for place_data in places_data:
            # Remove None values from amenities list
            place_data['amenities'] = [a for a in place_data['amenities'] if a is not None]
            place = facade.create_place(place_data)
            print(f"   ✓ {place_data['title']} (${place_data['price']}/night)")

        print("\n" + "="*60)
        print("✅ Database seeding complete!")
        print("="*60)
        print(f"📊 Summary:")
        print(f"   • Admin users: 1")
        print(f"   • Normal users: 2")
        print(f"   • Places: 3")
        print(f"   • Amenities: 5")
        print("="*60)
        print(f"\n🔑 Login credentials:")
        print(f"   Admin: {admin_data['email']} / {admin_data['password']}")
        print(f"   User 1: {user1_data['email']} / password123")
        print(f"   User 2: {user2_data['email']} / password123")
        print("="*60 + "\n")


if __name__ == '__main__':
    seed_database()
