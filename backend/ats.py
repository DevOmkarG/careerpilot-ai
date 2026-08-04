def calculate_ats_score(skills, text):
    score = 0

    # Skills Score (max 60)
    score += min(len(skills) * 5, 60)

    # Projects
    if "project" in text.lower():
        score += 10

    # GitHub
    if "github.com" in text.lower():
        score += 10

    # LinkedIn
    if "linkedin.com" in text.lower():
        score += 10

    # Education
    if "b.e" in text.lower() or "bachelor" in text.lower():
        score += 10

    return min(score, 100)