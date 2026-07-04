from sqlalchemy import Column, Integer, String, Float, Boolean, Date, ForeignKey, Text
from sqlalchemy.orm import relationship

from app.database.database import Base


class RoomListing(Base):
    __tablename__ = "room_listings"

    id = Column(Integer, primary_key=True, index=True)

    owner_id = Column(Integer, ForeignKey("users.id"))

    title = Column(String(200))

    description = Column(Text)

    location = Column(String(100))

    rent = Column(Float)

    available_from = Column(Date)

    room_type = Column(String(50))

    furnishing_status = Column(String(50))

    photo_url = Column(String(500))

    is_filled = Column(Boolean, default=False)

    owner = relationship("User", back_populates="listings")