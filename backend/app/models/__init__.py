# Models package initialization
from .user import User
from .artist import Artist
from .user_artist import UserArtist
from .release import Release

__all__ = ["User", "Artist", "UserArtist", "Release"]
