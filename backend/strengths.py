def get_strengths(skills):
    strengths = []

    if "Python" in skills:
        strengths.append("Strong programming foundation")

    if "React" in skills and "Node.js" in skills:
        strengths.append("Full Stack Development capabilities")

    if "Machine Learning" in skills:
        strengths.append("Knowledge of AI and Machine Learning concepts")

    if "Git" in skills:
        strengths.append("Version control and collaboration skills")

    return strengths