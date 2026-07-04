from pydantic import BaseModel
from datetime import datetime


class InterestRequestResponse(BaseModel):
    id: int
    listing_id: int
    tenant_id: int
    owner_id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True