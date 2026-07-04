def fallback_score(listing, tenant):

    score = 0

    explanation = []

    # Location

    if listing.location.lower() == tenant.preferred_location.lower():
        score += 40
        explanation.append("Preferred location matches.")
    else:
        explanation.append("Location differs.")

    # Budget

    if tenant.min_budget <= listing.rent <= tenant.max_budget:
        score += 40
        explanation.append("Rent is within budget.")
    else:
        explanation.append("Budget mismatch.")

    # Move-in date

    if listing.available_from <= tenant.move_in_date:
        score += 20
        explanation.append("Move-in date is suitable.")
    else:
        explanation.append("Move-in date is later than preferred.")

    return {
        "score": score,
        "explanation": " ".join(explanation)
    }