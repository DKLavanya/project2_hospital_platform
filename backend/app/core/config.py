import os
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Advanced Hospital & Telemedicine Platform"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecretkeytelemedplatform1234567890!@#")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # DB connection string (defaults to SQLite for zero-setup ease of use)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./telemed.db")
    
    # Redis URL (defaults to redis://localhost:6379/0; fallback to mock-in-memory inside services if Redis unavailable)
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    # AI Config
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY")

    class Config:
        case_sensitive = True

settings = Settings()
