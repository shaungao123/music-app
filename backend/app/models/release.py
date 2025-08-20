from sqlalchemy import Column, Integer, String, DateTime, Boolean, JSON, Text, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base

class Release(Base):
    __tablename__ = "releases"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True)
    
    # Spotify integration
    spotify_id = Column(String(255), unique=True, index=True, nullable=False)
    
    # Release information
    name = Column(String(500), nullable=False, index=True)
    release_type = Column(String(50), nullable=False)  # album, single, ep, compilation
    release_date = Column(DateTime(timezone=True), nullable=False)
    total_tracks = Column(Integer, nullable=True)
    
    # Artist relationship
    artist_id = Column(Integer, ForeignKey("artists.id"), nullable=False, index=True)
    
    # Media and images
    image_urls = Column(JSON, nullable=True)  # Array of image URLs with sizes
    spotify_url = Column(String(500), nullable=True)
    
    # Additional metadata
    genres = Column(JSON, nullable=True)  # Array of genre strings
    popularity_score = Column(Integer, nullable=True)  # 0-100 from Spotify
    external_urls = Column(JSON, nullable=True)  # Various external links
    
    # App-specific fields
    is_new_release = Column(Boolean, default=True)  # Track if this is a new release
    notification_sent = Column(Boolean, default=False)  # Track if notifications were sent
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    artist = relationship("Artist", back_populates="releases")
    
    def __repr__(self):
        return f"<Release(id={self.id}, name='{self.name}', artist_id={self.artist_id}, type='{self.release_type}')>"
    
    @property
    def primary_image_url(self):
        """Get the primary image URL (first in the list)"""
        if self.image_urls and len(self.image_urls) > 0:
            return self.image_urls[0].get('url') if isinstance(self.image_urls[0], dict) else self.image_urls[0]
        return None
    
    @property
    def is_album(self):
        """Check if this is an album"""
        return self.release_type.lower() == "album"
    
    @property
    def is_single(self):
        """Check if this is a single"""
        return self.release_type.lower() == "single"
