SKILLS = [
    "Python",
    "Java",
    "C++",
    "HTML",
    "CSS",
    "JavaScript",
    "SQL",
    "MongoDB",
    "React",
    "Node.js",
    "Machine Learning",
    "Git"
]

def get_missing_skills(skills):
    missing = []

    for skill in SKILLS:
        if skill not in skills:
            missing.append(skill)

    return missing

