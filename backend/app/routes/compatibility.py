from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.oauth2 import get_current_user

from app.models.room_listing import RoomListing
from app.models.tenant_profile import TenantProfile
from app.models.compatibility import Compatibility

from app.services.gemini_service import calculate_ai_score
from app.services.compatibility_service import fallback_score

router = APIRouter(tags=["Compatibility"])


@router.post("/compatibility/{listing_id}")
def calculate_compatibility(
    listing_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    # Only tenants can calculate compatibility
    if current_user["role"] != "tenant":
        raise HTTPException(
            status_code=403,
            detail="Only tenants can calculate compatibility."
        )

    # Get room listing
    listing = db.query(RoomListing).filter(
        RoomListing.id == listing_id
    ).first()

    if listing is None:
        raise HTTPException(
            status_code=404,
            detail="Room listing not found."
        )

    # Get tenant profile
    tenant = db.query(TenantProfile).filter(
        TenantProfile.tenant_id == current_user["id"]
    ).first()

    if tenant is None:
        raise HTTPException(
            status_code=404,
            detail="Tenant profile not found. Please create your profile first."
        )

    # Try Gemini AI first
    try:
        result = calculate_ai_score(
            listing,
            tenant
        )

    # Use fallback if Gemini fails
    except Exception:
        result = fallback_score(
            listing,
            tenant
        )

    # Save or update compatibility score
    existing = db.query(Compatibility).filter(
        Compatibility.tenant_id == current_user["id"],
        Compatibility.listing_id == listing.id
    ).first()

    if existing:
        existing.score = result["score"]
        existing.explanation = result["explanation"]

    else:
        compatibility = Compatibility(
            tenant_id=current_user["id"],
            listing_id=listing.id,
            score=result["score"],
            explanation=result["explanation"]
        )

        db.add(compatibility)

    db.commit()

    return {
        "message": "Compatibility calculated successfully.",
        "score": result["score"],
        "explanation": result["explanation"]
    }