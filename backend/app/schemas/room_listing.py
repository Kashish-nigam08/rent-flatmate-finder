from pydantic import BaseModel
from datetime import date


class ListingCreate(BaseModel):

    title: str

    description: str

    location: str

    rent: float

    available_from: date

    room_type: str

    furnishing_status: str

    photo_url: str