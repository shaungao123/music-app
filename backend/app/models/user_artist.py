from sqlalchemy import Column, Integer, DateTime, ForeignKey, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base

class UserArtist(Base):
    __tablename__ = "user_artists"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    artist_id = Column(Integer, ForeignKey("artists.id"), nullable=False, index=True)
    
    # Relationship metadata
    listening_rank = Column(Integer, nullable=True)  # User's ranking of this artist (1, 2, 3, etc.)
    play_count_estimate = Column(Float, nullable=True)  # Estimated play count from Spotify
    discovered_date = Column(DateTime(timezone=True), nullable=True)  # When user first discovered/followed
    
    # User preferences
    notification_enabled = Column(Integer, default=1)  # 1=enabled, 0=disabled for this artist
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="followed_artists")
    artist = relationship("Artist", back_populates="followed_by_users")
    
    def __repr__(self):
        return f"<UserArtist(user_id={self.user_id}, artist_id={self.artist_id}, rank={self.listening_rank})>"
    
    @property
    def is_top_artist(self):
        """Check if this is one of the user's top artists (rank <= 10)"""
        return self.listening_rank is not None and self.listening_rank <= 10
