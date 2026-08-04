from fastapi import APIRouter
from bson import ObjectId

from database import application_collection

router = APIRouter()


def serialize(job):
    job["_id"] = str(job["_id"])
    return job


@router.get("/applications")
async def get_jobs():

    jobs = application_collection.find()

    return [serialize(job) for job in jobs]


@router.post("/applications")
async def add_job(job: dict):

    result = application_collection.insert_one(job)

    job["_id"] = str(result.inserted_id)

    return job


@router.put("/applications/{id}")
async def update_job(id: str, job: dict):

    application_collection.update_one(

        {

            "_id": ObjectId(id)

        },

        {

            "$set": job

        }

    )

    return {

        "message": "updated"

    }


@router.delete("/applications/{id}")
async def delete_job(id: str):

    application_collection.delete_one(

        {

            "_id": ObjectId(id)

        }

    )

    return {

        "message": "deleted"

    }