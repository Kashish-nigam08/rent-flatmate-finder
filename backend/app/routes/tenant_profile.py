from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.oauth2 import get_current_user

from app.models.tenant_profile import TenantProfile
from app.schemas.tenant_profile import TenantProfileCreate

router = APIRouter(tags=["Tenant Profile"])
@router.post("/tenant/profile")
def create_profile(
    profile: TenantProfileCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "tenant":
        raise HTTPException(
            status_code=403,
            detail="Only tenants can create profile."
        )

    existing = db.query(TenantProfile).filter(
        TenantProfile.tenant_id == current_user["id"]
    ).first()

    if existing:

        existing.preferred_location = profile.preferred_location
        existing.min_budget = profile.min_budget
        existing.max_budget = profile.max_budget
        existing.move_in_date = profile.move_in_date

    else:

        db.add(
            TenantProfile(
                tenant_id=current_user["id"],
                preferred_location=profile.preferred_location,
                min_budget=profile.min_budget,
                max_budget=profile.max_budget,
                move_in_date=profile.move_in_date
            )
        )

    db.commit()

    return {
        "message": "Profile saved successfully."
    }

@router.post("/tenant/profile")
def create_profile(
    profile: TenantProfileCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "tenant":
        raise HTTPException(
            status_code=403,
            detail="Only tenants can create profile."
        )

    existing = db.query(TenantProfile).filter(
        TenantProfile.tenant_id == current_user["id"]
    ).first()

    if existing:

        existing.preferred_location = profile.preferred_location
        existing.min_budget = profile.min_budget
        existing.max_budget = profile.max_budget
        existing.move_in_date = profile.move_in_date

    else:

        db.add(
            TenantProfile(
                tenant_id=current_user["id"],
                preferred_location=profile.preferred_location,
                min_budget=profile.min_budget,
                max_budget=profile.max_budget,
                move_in_date=profile.move_in_date
            )
        )

    db.commit()

    return {
        "message": "Profile saved successfully."
    }