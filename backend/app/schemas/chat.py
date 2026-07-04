from pydantic import BaseModel
from datetime import datetime


class ChatMessageCreate(BaseModel):
    receiver_id: int
    message: str


class ChatMessageResponse(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    message: str
    sent_at: datetime

    class Config:
        from_attributes = True