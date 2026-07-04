from sqlalchemy import Column, Integer, String
from app.database.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    role = Column(String(20), nullable=False)   # admin / owner / tenant
    listings = relationship(
        "RoomListing",
        back_populates="owner"
    )
    listings = relationship(
    "RoomListing",
    back_populates="owner"
)