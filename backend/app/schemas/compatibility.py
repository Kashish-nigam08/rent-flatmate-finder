from pydantic import BaseModel


class CompatibilityResponse(BaseModel):

    score: float

    explanation: str