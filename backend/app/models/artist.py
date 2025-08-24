from sqlalchemy import Column, Integer, String, DateTime, Float, JSON, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base

class Artist(Base):
    __tablename__ = "artists"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True)
    
    # Spotify integration
    spotify_id = Column(String(255), unique=True, index=True, nullable=False)
    
    # Artist information
    name = Column(String(255), nullable=False, index=True)
    genres = Column(JSON, nullable=True)  # Array of genre strings
    popularity_score = Column(Integer, nullable=True)  # 0-100 from Spotify
    
    # Images and media
    image_urls = Column(JSON, nullable=True)  # Array of image URLs with sizes
    spotify_url = Column(String(500), nullable=True)
    
    # Additional metadata
    followers_count = Column(Integer, nullable=True)
    external_urls = Column(JSON, nullable=True)  # Various external links
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_checked_at = Column(DateTime(timezone=True), nullable=True)  # When we last checked for new releases
    
    # Relationships
    releases = relationship("Release", back_populates="artist", cascade="all, delete-orphan")
    followed_by_users = relationship("UserArtist", back_populates="artist", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Artist(id={self.id}, spotify_id='{self.spotify_id}', name='{self.name}')>"
    
    @property
    def primary_genre(self):
        """Get the primary genre (first in the list)"""
        if self.genres and len(self.genres) > 0:
            return self.genres[0]
        return None
    
    @property
    def primary_image_url(self):
        """Get the primary image URL (first in the list)"""
        if self.image_urls and len(self.image_urls) > 0:
            return self.image_urls[0].get('url') if isinstance(self.image_urls[0], dict) else self.image_urls[0]
        return None

