from app.auth.password import verify_password
from app.auth.jwt_handler import create_access_token

hashed = "$2b$12$NE5.rusXMWl6M2x0evjcie8tmKunAl3mKhcJg2M9NivHSq59PRp4q"

print("Password:", verify_password("Password123", hashed))

token = create_access_token({
    "id": 1,
    "email": "test@test.com",
    "role": "tenant"
})

print("JWT:", token)