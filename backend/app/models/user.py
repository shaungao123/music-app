from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True)
    
    # Spotify integration
    spotify_user_id = Column(String(255), unique=True, index=True, nullable=False)
    spotify_access_token = Column(Text, nullable=True)
    spotify_refresh_token = Column(Text, nullable=True)
    spotify_token_expires_at = Column(DateTime, nullable=True)
    
    # User profile
    email = Column(String(255), unique=True, index=True, nullable=True)
    display_name = Column(String(255), nullable=True)
    profile_image_url = Column(String(500), nullable=True)
    country = Column(String(10), nullable=True)
    
    # App preferences
    notification_enabled = Column(Boolean, default=True)
    email_notifications = Column(Boolean, default=True)
    push_notifications = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    followed_artists = relationship("UserArtist", back_populates="user", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<User(id={self.id}, spotify_user_id='{self.spotify_user_id}', display_name='{self.display_name}')>"
