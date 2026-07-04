from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.oauth2 import get_current_user

from app.models.user import User
from app.models.room_listing import RoomListing
from app.models.interest_request import InterestRequest
from app.services.email_service import send_email

router = APIRouter(tags=["Interest Requests"])


# -------------------------------------------------------
# Tenant sends interest request
# -------------------------------------------------------

@router.post("/interest/{listing_id}")
def send_interest_request(
    listing_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "tenant":
        raise HTTPException(
            status_code=403,
            detail="Only tenants can send interest requests."
        )

    listing = db.query(RoomListing).filter(
        RoomListing.id == listing_id
    ).first()

    if listing is None:
        raise HTTPException(
            status_code=404,
            detail="Listing not found."
        )

    existing = db.query(InterestRequest).filter(
        InterestRequest.listing_id == listing_id,
        InterestRequest.tenant_id == current_user["id"]
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Interest request already sent."
        )

    request = InterestRequest(
        listing_id=listing.id,
        tenant_id=current_user["id"],
        owner_id=listing.owner_id,
        status="Pending"
    )

    db.add(request)
    db.commit()
    db.refresh(request)

    owner = db.query(User).filter(
    User.id == listing.owner_id
    ).first()

    if owner:
        send_email(
            receiver_email=owner.email,
            subject="New Interest Request",
            body=f"""
    Hello {owner.full_name},

    A tenant has shown interest in your room listing.

    Please login to Rent Flatmate Finder to review the request.
    """
        )

    return {
        "message": "Interest request sent successfully.",
        "request_id": request.id
    }


# -------------------------------------------------------
# Owner views all requests
# -------------------------------------------------------

@router.get("/owner/requests")
def owner_requests(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "owner":
        raise HTTPException(
            status_code=403,
            detail="Only owners can view requests."
        )

    requests = db.query(InterestRequest).filter(
        InterestRequest.owner_id == current_user["id"]
    ).all()

    return requests


# -------------------------------------------------------
# Owner accepts request
# -------------------------------------------------------

@router.patch("/request/{request_id}/accept")
def accept_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "owner":
        raise HTTPException(
            status_code=403,
            detail="Only owners can accept requests."
        )

    request = db.query(InterestRequest).filter(
        InterestRequest.id == request_id,
        InterestRequest.owner_id == current_user["id"]
    ).first()

    if request is None:
        raise HTTPException(
            status_code=404,
            detail="Request not found."
        )

    request.status = "Accepted"

    listing = db.query(RoomListing).filter(
        RoomListing.id == request.listing_id
    ).first()

    if listing:
        listing.is_filled = True

    db.commit()

    tenant = db.query(User).filter(
        User.id == request.tenant_id
    ).first()

    if tenant:
        send_email(
            receiver_email=tenant.email,
            subject="Request Accepted",
            body=f"""
    Hello {tenant.full_name},

    Congratulations!

    Your room request has been accepted.

    Please login to continue.
    """
        )

    return {
        "message": "Interest request accepted."
    }


# -------------------------------------------------------
# Owner rejects request
# -------------------------------------------------------

@router.patch("/request/{request_id}/reject")
def reject_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "owner":
        raise HTTPException(
            status_code=403,
            detail="Only owners can reject requests."
        )

    request = db.query(InterestRequest).filter(
        InterestRequest.id == request_id,
        InterestRequest.owner_id == current_user["id"]
    ).first()

    if request is None:
        raise HTTPException(
            status_code=404,
            detail="Request not found."
        )

    request.status = "Rejected"

    db.commit()
    tenant = db.query(User).filter(
    User.id == request.tenant_id
    ).first()

    if tenant:
        send_email(
            receiver_email=tenant.email,
            subject="Request Rejected",
            body=f"""
    Hello {tenant.full_name},

    Unfortunately your room request has been rejected.

    You can continue searching for other rooms.

    Thank you.
    """
        )

    return {
        "message": "Interest request rejected."
    }