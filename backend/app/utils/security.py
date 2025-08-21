from datetime import datetime, timedelta
from typing import Optional, Union
from jose import JWTError, jwt
from passlib.context import CryptContext
from ..config import settings

# JWT Configuration
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing context (for future use)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> Optional[dict]:
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def create_user_token(user_id: int, spotify_user_id: str) -> str:
    """Create a JWT token for a specific user"""
    data = {
        "sub": str(user_id),
        "spotify_user_id": spotify_user_id,
        "type": "access"
    }
    return create_access_token(data)

def verify_user_token(token: str) -> Optional[dict]:
    """Verify a user JWT token and return user data"""
    payload = verify_token(token)
    if payload is None:
        return None
    
    # Check if token is expired
    exp = payload.get("exp")
    if exp is None:
        return None
    
    # Check if token is for a user
    if payload.get("type") != "access":
        return None
    
    return payload

def get_password_hash(password: str) -> str:
    """Hash a password (for future use)"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash (for future use)"""
    return pwd_context.verify(plain_password, hashed_password)
