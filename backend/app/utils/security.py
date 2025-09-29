from datetime import datetime, timedelta
from typing import Optional, Dict
from jose import JWTError, jwt
from passlib.context import CryptContext
from ..config import settings

# === JWT Config ===
SECRET_KEY: str = settings.SECRET_KEY
REFRESH_SECRET_KEY: str = settings.REFRESH_SECRET_KEY
ALGORITHM: str = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
REFRESH_TOKEN_EXPIRE_DAYS: int = 7

# === Password hashing ===
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ----------------------------
# Token Creation
# ----------------------------

def create_access_token(user_id: int) -> str:
    """Create a short-lived access token with only user_id."""
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": str(user_id), "type": "access", "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(user_id: int) -> str:
    """Create a long-lived refresh token with only user_id."""
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    payload = {"sub": str(user_id), "type": "refresh", "exp": expire}
    return jwt.encode(payload, REFRESH_SECRET_KEY, algorithm=ALGORITHM)


# ----------------------------
# Token Verification
# ----------------------------

def verify_access_token(token: str) -> Optional[int]:
    """Verify access token and return user_id if valid."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "access":
            return None
        return int(payload["sub"])  # user_id
    except JWTError:
        return None


def verify_refresh_token(token: str) -> Optional[Dict]:
    """Verify refresh token and return payload if valid."""
    try:
        payload = jwt.decode(token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            return None
        return payload
    except JWTError:
        return None


# ----------------------------
# Password Hashing
# ----------------------------

def get_password_hash(password: str) -> str:
    """Hash a password."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Check if plaintext password matches hash."""
    return pwd_context.verify(plain_password, hashed_password)
