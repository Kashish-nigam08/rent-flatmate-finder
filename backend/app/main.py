from fastapi import FastAPI

from app.database.database import Base, engine

# Import models BEFORE create_all()
from app.models.user import User
from app.models.room_listing import RoomListing
from app.models.compatibility import Compatibility
from app.models.tenant_profile import TenantProfile
from app.models.interest_request import InterestRequest

from app.routes.health import router as health_router
from app.routes.auth import router as auth_router
from app.routes.listings import router as listing_router
from app.routes.compatibility import router as compatibility_router
from app.routes.tenant_profile import router as tenant_router
from app.routes.interest_request import router as interest_router
from app.models.chat_message import ChatMessage
from app.routes.websocket_chat import router as websocket_router
from app.routes.notifications import router as notification_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Rent Flatmate Finder API")

app.include_router(health_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(listing_router, prefix="/api")
app.include_router(compatibility_router, prefix="/api")
app.include_router(tenant_router,prefix="/api")
app.include_router(interest_router,prefix="/api")
app.include_router(websocket_router)
app.include_router(
    notification_router,
    prefix="/api"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://rent-flatmate-finder-three.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)