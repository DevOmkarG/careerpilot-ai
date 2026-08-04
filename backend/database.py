from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

uri = os.getenv("MONGODB_URI")

client = MongoClient(
    uri,
    tls=True,
    serverSelectionTimeoutMS=5000
)

print(client.admin.command("ping"))

db = client["careerpilot"]
application_collection = db["applications"]

users_collection = db["users"]
analysis_collection = db["analysis"]