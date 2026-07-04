from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from fastapi import APIRouter

router = APIRouter()
from app.database.database import get_db
from app.models.room_listing import RoomListing
from app.schemas.room_listing import ListingCreate
from app.auth.oauth2 import get_current_user

router = APIRouter(tags=["Room Listings"])

@router.post("/listings")
def create_listing(
    listing: ListingCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "owner":
        raise HTTPException(
            status_code=403,
            detail="Only owners can create listings"
        )

    new_listing = RoomListing(
        owner_id=current_user["id"],
        title=listing.title,
        description=listing.description,
        location=listing.location,
        rent=listing.rent,
        available_from=listing.available_from,
        room_type=listing.room_type,
        furnishing_status=listing.furnishing_status,
        photo_url=listing.photo_url
    )

    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)

    return {
        "message": "Listing created successfully",
        "listing": new_listing
    }

@router.get("/listings")
def get_all_listings(
    location: Optional[str] = None,
    max_budget: Optional[float] = None,
    db: Session = Depends(get_db)
):

    query = db.query(RoomListing).filter(
        RoomListing.is_filled == False
    )

    if location:
        query = query.filter(RoomListing.location.ilike(f"%{location}%"))

    if max_budget:
        query = query.filter(RoomListing.rent <= max_budget)

    return query.all()

@router.get("/my-listings")
def get_my_listings(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user["role"] != "owner":
        raise HTTPException(
            status_code=403,
            detail="Only owners can access their listings."
        )

    listings = db.query(RoomListing).filter(
        RoomListing.owner_id == current_user["id"]
    ).all()

    return listings
@router.put("/listings/{listing_id}")
def update_listing(
    listing_id: int,
    updated: ListingCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    listing = db.query(RoomListing).filter(
        RoomListing.id == listing_id
    ).first()

    if not listing:
        raise HTTPException(
            status_code=404,
            detail="Listing not found"
        )

    if listing.owner_id != current_user["id"]:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    listing.title = updated.title
    listing.description = updated.description
    listing.location = updated.location
    listing.rent = updated.rent
    listing.available_from = updated.available_from
    listing.room_type = updated.room_type
    listing.furnishing_status = updated.furnishing_status
    listing.photo_url = updated.photo_url

    db.commit()
    db.refresh(listing)

    return {
        "message": "Listing updated successfully"
    }

@router.delete("/listings/{listing_id}")
def delete_listing(
    listing_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    listing = db.query(RoomListing).filter(
        RoomListing.id == listing_id
    ).first()

    if not listing:
        raise HTTPException(
            status_code=404,
            detail="Listing not found"
        )

    if listing.owner_id != current_user["id"]:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    db.delete(listing)
    db.commit()

    return {
        "message": "Listing deleted successfully"
    }

@router.patch("/listings/{listing_id}/filled")
def mark_filled(
    listing_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    listing = db.query(RoomListing).filter(
        RoomListing.id == listing_id
    ).first()

    if not listing:
        raise HTTPException(
            status_code=404,
            detail="Listing not found"
        )

    if listing.owner_id != current_user["id"]:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    listing.is_filled = True

    db.commit()

    return {
        "message": "Listing marked as filled"
    }

