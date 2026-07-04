from datetime import date
from pydantic import BaseModel


class TenantProfileCreate(BaseModel):

    preferred_location: str

    min_budget: float

    max_budget: float

    move_in_date: date