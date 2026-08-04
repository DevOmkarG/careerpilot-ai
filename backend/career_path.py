def get_career_paths(skills):
    careers = []

    if "Machine Learning" in skills:
        careers.append("AI/ML Engineer")

    if "React" in skills and "Node.js" in skills:
        careers.append("Full Stack Developer")

    if "Python" in skills:
        careers.append("Python Developer")

    if "Java" in skills:
        careers.append("Java Developer")

    if "C++" in skills:
        careers.append("C++ Developer")

    if "HTML" in skills and "CSS" in skills and "JavaScript" in skills:
        careers.append("Front-End Developer")

    if "SQL" in skills and "MongoDB" in skills:
        careers.append("Database Developer")

    if "Machine Learning" in skills and "Python" in skills:
        careers.append("Data Scientist")

    return careers[:4]