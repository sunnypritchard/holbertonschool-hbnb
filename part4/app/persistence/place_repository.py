"""
Place Repository Module

This module provides a specialized repository for Place model operations,
extending the base SQLAlchemyRepository with place-specific functionality.
"""

from app.persistence.repository import SQLAlchemyRepository
from app.models.place import Place


class PlaceRepository(SQLAlchemyRepository):
    """
    Repository for Place model with database persistence.

    Extends SQLAlchemyRepository to provide persistent storage
    for Place entities using SQLAlchemy ORM.
    """

    def __init__(self):
        """Initialize PlaceRepository with Place model."""
        super().__init__(Place)
