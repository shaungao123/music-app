from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # Database Configuration
    DATABASE_URL: str = "postgresql://username:password@localhost:5432/music_app_db"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    
    # Application Settings
    DEBUG: bool = True
    ENVIRONMENT: str = "development"
    
    # Spotify API Configuration
    SPOTIFY_CLIENT_ID: Optional[str] = None
    SPOTIFY_CLIENT_SECRET: Optional[str] = None
    SPOTIFY_REDIRECT_URI: str = "http://localhost:8000/spotify/callback"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# Create settings instance
settings = Settings()

# Print config values for debugging (remove in production)
if settings.DEBUG:
    print(f"Environment: {settings.ENVIRONMENT}")
    print(f"Database URL: {settings.DATABASE_URL}")
    print(f"Secret Key: {settings.SECRET_KEY[:10]}..." if len(settings.SECRET_KEY) > 10 else "Secret Key: Too short!")

