from sqlalchemy import Column, Integer, ForeignKey, Float, Text
from app.database.database import Base

class Compatibility(Base):

    __tablename__ = "compatibility_scores"

    id = Column(Integer, primary_key=True, index=True)

    tenant_id = Column(Integer, ForeignKey("users.id"))

    listing_id = Column(Integer, ForeignKey("room_listings.id"))

    score = Column(Float)

    explanation = Column(Text)