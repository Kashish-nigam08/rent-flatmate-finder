from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class TenantProfile(Base):
    __tablename__ = "tenant_profiles"

    id = Column(Integer, primary_key=True, index=True)

    tenant_id = Column(Integer, ForeignKey("users.id"), unique=True)

    preferred_location = Column(String(100))

    min_budget = Column(Float)

    max_budget = Column(Float)

    move_in_date = Column(Date)

    tenant = relationship("User")