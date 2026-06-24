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

def detect_skills(text):
    found = []

    text = text.lower()

    for skill in SKILLS:
        if skill.lower() in text:
            found.append(skill)

    return found