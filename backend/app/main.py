from fastapi import FastAPI
from .config import settings
from .database import test_db_connection
from .routers import auth

app = FastAPI(
    title="Music Release Notification API", 
    version="1.0.0",
    debug=settings.DEBUG
)

# Include routers
app.include_router(auth.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/health/db")
async def health_db():
    """Health check endpoint that tests database connection"""
    return test_db_connection()

@app.get("/config")
async def config_info():
    """Debug endpoint to show current configuration (remove in production)"""
    if settings.DEBUG:
        return {
            "environment": settings.ENVIRONMENT,
            "debug": settings.DEBUG,
            "database_url": settings.DATABASE_URL[:20] + "..." if len(settings.DATABASE_URL) > 20 else settings.DATABASE_URL,
            "secret_key_length": len(settings.SECRET_KEY)
        }
    return {"message": "Config endpoint disabled in production"}
