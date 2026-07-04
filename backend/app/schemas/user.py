from pydantic import BaseModel, EmailStr

class RegisterUser(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str

class LoginUser(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True