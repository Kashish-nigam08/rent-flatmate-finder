from fastapi import APIRouter

router = APIRouter()


@router.get("/")

def health():

    return {

        "status": "Running",

        "project": "Rent Flatmate Finder API"

    }