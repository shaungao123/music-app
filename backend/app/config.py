from pydantic_settings import BaseSettings
from typing import Optional
import os
from pathlib import Path

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
    
    model_config = {  
        "env_file": [
            ".env",                                    # Current directory
            str(Path(__file__).parent / ".env"),       # Same directory as config.py
            "backend/.env"                             # backend subdirectory
        ],
        "env_file_encoding": "utf-8"
    }

# Create settings instance
settings = Settings()

# Print config values for debugging
if settings.DEBUG:
    print(f"Environment: {settings.ENVIRONMENT}")
    print(f"Database URL: {settings.DATABASE_URL}")
    print(f"Secret Key: {settings.SECRET_KEY[:10]}..." if len(settings.SECRET_KEY) > 10 else "Secret Key: Too short!")