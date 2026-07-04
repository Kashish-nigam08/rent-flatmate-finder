import json
import google.generativeai as genai

from app.config import settings

def calculate_ai_score(listing, tenant):
    genai.configure(api_key=settings.GEMINI_API_KEY)

    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"""
You are an AI roommate compatibility engine.

Compare these details.

ROOM LISTING

Location:
{listing.location}

Rent:
{listing.rent}

Available From:
{listing.available_from}

Room Type:
{listing.room_type}

Furnishing:
{listing.furnishing_status}

------------------------------------

TENANT PROFILE

Preferred Location:
{tenant.preferred_location}

Minimum Budget:
{tenant.min_budget}

Maximum Budget:
{tenant.max_budget}

Move In Date:
{tenant.move_in_date}

------------------------------------

Return ONLY valid JSON.

Example:

{{
"score":87,
"explanation":"The listing matches the tenant's preferred location and budget. Move-in date is also suitable."
}}
"""

    response = model.generate_content(prompt)

    return json.loads(response.text)