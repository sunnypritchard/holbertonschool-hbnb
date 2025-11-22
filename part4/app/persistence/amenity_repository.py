"""
Amenity Repository Module

This module provides a specialized repository for Amenity model operations,
extending the base SQLAlchemyRepository with amenity-specific functionality.
"""

from app.persistence.repository import SQLAlchemyRepository
from app.models.amenity import Amenity


class AmenityRepository(SQLAlchemyRepository):
    """
    Repository for Amenity model with database persistence.

    Extends SQLAlchemyRepository to provide persistent storage
    for Amenity entities using SQLAlchemy ORM.
    """

    def __init__(self):
        """Initialize AmenityRepository with Amenity model."""
        super().__init__(Amenity)
