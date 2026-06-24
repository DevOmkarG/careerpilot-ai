import fitz

def extract_text_from_pdf(pdf_file):
    text = ""

    pdf_bytes = pdf_file.file.read()

    with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()

    return text