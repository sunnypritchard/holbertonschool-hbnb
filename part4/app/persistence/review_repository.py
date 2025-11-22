"""
Review Repository Module
Handles database persistence for Review entities using SQLAlchemy
"""

from app.models.review import Review
from app.extensions import db


class ReviewRepository:
    """
    Repository for managing Review entities with SQLAlchemy database persistence.
    """

    def __init__(self):
        self.model = Review

    def add(self, review):
        """Add a new review to the database"""
        db.session.add(review)
        db.session.commit()
        return review

    def get(self, review_id):
        """Get a review by ID"""
        return db.session.get(self.model, review_id)

    def get_all(self):
        """Get all reviews"""
        return db.session.query(self.model).all()

    def update(self, review_id, data):
        """Update a review"""
        review = self.get(review_id)
        if review:
            if 'text' in data:
                review.text = data['text']
            if 'rating' in data:
                review.rating = data['rating']
            db.session.commit()
        return review

    def delete(self, review_id):
        """Delete a review"""
        review = self.get(review_id)
        if review:
            db.session.delete(review)
            db.session.commit()
            return True
        return False

    def get_by_place(self, place_id):
        """Get all reviews for a specific place"""
        return db.session.query(self.model).filter_by(place_id=place_id).all()
