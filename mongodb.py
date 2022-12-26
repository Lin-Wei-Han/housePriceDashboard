from dotenv import load_dotenv,find_dotenv
import os 
import pprint
from pymongo import MongoClient
import jsonpickle

load_dotenv(find_dotenv())

mongodb_url = os.environ.get("MONGODB_URL")
client = MongoClient(mongodb_url)

dbs = client.list_database_names()
test_db = client.users

collections = test_db.list_collection_names()

printer = pprint.PrettyPrinter() 

def insert_test_doc(x1,x2,x3,x4,x5):
    collection = client.users.prediction
    data = {
        "buildingArea":x1,
        "roomAmount":x2,
        "livingroomAmount":x3,
        "bathroomAmount":x4,
        "prediction":x5
    }
    inserted_id = collection.insert_one(data).inserted_id
    print(inserted_id)
