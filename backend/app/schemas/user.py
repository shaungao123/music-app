from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# Base User Schema
class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    display_name: Optional[str] = Field(None, max_length=255)
    country: Optional[str] = Field(None, max_length=10)
    notification_enabled: bool = True
    email_notifications: bool = True
    push_notifications: bool = True

# User Creation Schema
class UserCreate(UserBase):
    spotify_user_id: str = Field(..., max_length=255, description="Spotify user ID from OAuth")
    spotify_access_token: Optional[str] = None
    spotify_refresh_token: Optional[str] = None
    spotify_token_expires_at: Optional[datetime] = None
    profile_image_url: Optional[str] = Field(None, max_length=500)

# User Login Schema
class UserLogin(BaseModel):
    spotify_user_id: str = Field(..., max_length=255, description="Spotify user ID for login")

# User Update Schema
class UserUpdate(BaseModel):
    display_name: Optional[str] = Field(None, max_length=255)
    country: Optional[str] = Field(None, max_length=10)
    profile_image_url: Optional[str] = Field(None, max_length=500)
    notification_enabled: Optional[bool] = None
    email_notifications: Optional[bool] = None
    push_notifications: Optional[bool] = None

# User Response Schema
class UserResponse(UserBase):
    id: int
    spotify_user_id: str
    profile_image_url: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    last_login_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse

# Token Data Schema (for JWT payload)
class TokenData(BaseModel):
    user_id: Optional[int] = None
    spotify_user_id: Optional[str] = None
