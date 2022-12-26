#from fastapi import FastAPI
from flask import Flask, request, send_from_directory,jsonify
from flask_cors import CORS
from flask_restful import Api, Resource
import os
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
import csv
import math
from mongodb import insert_test_doc
from dotenv import load_dotenv,find_dotenv
import os 
import pprint
from pymongo import MongoClient
from collections import Counter

load_dotenv(find_dotenv())

mongodb_url = os.environ.get("MONGODB_URL")
client = MongoClient(mongodb_url)

printer = pprint.PrettyPrinter() 

# app() frontend page
app = Flask(__name__, static_folder='frontend/build')

# CORS
CORS(app)

# config
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['PROPAGATE_EXCEPTIONS'] = True
api = Api(app)

# frontend pages route
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# open model file
housePriceModel = joblib.load("RF_model.joblib")

@app.get('/getAPI')
def index():
    return "Fast API"

@app.get('/getKShousePrice')
def getKShousePrice():
    KStime=[]
    KSprice = []
    with open("./db/ks.csv") as csvfile:
        ks = csv.reader(csvfile, quoting=csv.QUOTE_NONNUMERIC) 
        for i in ks: 
            KStime.append(i[0])
            KSprice.append(math.trunc(int(i[1])))
    return {"time":KStime,"price": KSprice}

@app.get('/getNThousePrice')
def getNThousePrice():
    nttime=[]
    ntprice = []
    with open("./db/nt.csv") as csvfile:
        nt = csv.reader(csvfile, quoting=csv.QUOTE_NONNUMERIC) 
        for i in nt: 
            nttime.append(i[0])
            ntprice.append(math.trunc(int(i[1])))
    return {"time":nttime,"price":ntprice}   

@app.get('/getTChousePrice')
def getTChousePrice():
    tctime=[]
    tcprice = []
    with open("./db/tc.csv") as csvfile:
        tc = csv.reader(csvfile, quoting=csv.QUOTE_NONNUMERIC) 
        for i in tc: 
            tctime.append(i[0])
            tcprice.append(math.trunc(int(i[1])))
    return {"time":tctime,"price":tcprice}   

@app.get('/getTNhousePrice')
def getTNhousePrice():
    tntime=[]
    tnprice = []
    with open("./db/tn.csv") as csvfile:
        tn = csv.reader(csvfile, quoting=csv.QUOTE_NONNUMERIC) 
        for i in tn: 
            tntime.append(i[0])
            tnprice.append(math.trunc(int(i[1])))
    return {"time":tntime,"price":tnprice}     

@app.get('/getTPhousePrice')
def getTPhousePrice():
    tptime=[]
    tpprice = []
    with open("./db/tp.csv") as csvfile:
        tp = csv.reader(csvfile, quoting=csv.QUOTE_NONNUMERIC) 
        for i in tp: 
            tptime.append(i[0])
            tpprice.append(math.trunc(int(i[1])))
    return {"time":tptime,"price":tpprice}     

@app.get('/getTYhousePrice')
def getTYhousePrice():
    tytime=[]
    typrice = []
    with open("./db/ty.csv") as csvfile:
        ty = csv.reader(csvfile, quoting=csv.QUOTE_NONNUMERIC) 
        for i in ty: 
            tytime.append(i[0])
            typrice.append(math.trunc(int(i[1])))
    return {"time":tytime,"price":typrice}    

@app.get('/getUsers')
def getUsers():
    bathroomAmount=[]
    buildingArea=[]
    livingroomAmount=[]
    prediction=[]
    roomAmount=[]
    users_collection = client.users.prediction
    dataset = users_collection.find()
    for i in dataset: 
        printer.pprint(i)
        bathroomAmount.append(i["bathroomAmount"])
        buildingArea.append(i["buildingArea"])
        livingroomAmount.append(i["livingroomAmount"])
        prediction.append(i["prediction"])
        roomAmount.append(i["roomAmount"])
    bathroom = []
    livingroom = []
    room = []
    building = []
    for i in sorted(Counter(bathroomAmount).keys()):
        bathroom.append(i)
    for i in sorted(Counter(livingroomAmount).keys()):
        livingroom.append(i)
    for i in sorted(Counter(roomAmount).keys()):
        room.append(i)
    for i in sorted(Counter(buildingArea).keys()):
        building.append(i)
    return jsonify({"bathroomAmount":list(bathroom),"livingroomAmount":list(livingroom),"roomAmount":list(room),"buildingArea":list(building)},
    {"bathroomAmount":bathroomAmount,"livingroomAmount":livingroomAmount,"roomAmount":roomAmount,"buildingArea":buildingArea,
    "prediction":prediction})

# BaseModel check post data type
class HousePriceItem(BaseModel):
    buildingArea: float
    roomAmount: int
    livingroomAmount: int
    bathroomAmount: int

class housePricePredict(Resource):
    def post(item: HousePriceItem):
        insertValues = request.get_json()
        x1=insertValues['buildingArea']
        x2=insertValues['roomAmount']
        x3=insertValues['livingroomAmount']
        x4=insertValues['bathroomAmount']
        input = np.array([[x1, x2, x3, x4]])

        result = housePriceModel.predict(input)
        return {"prediction": int(result)}

class usersPredict(Resource):
    def post(item: HousePriceItem):
        insertData = request.get_json()
        x1=insertData['buildingArea']
        x2=insertData['roomAmount']
        x3=insertData['livingroomAmount']
        x4=insertData['bathroomAmount']
        x5=insertData['prediction']
        insert_test_doc(x1,x2,x3,x4,x5)
        print(x1,x2,x3,x4,x5)
        return {"success"}

api.add_resource(housePricePredict, '/getHousePrice')
api.add_resource(usersPredict, '/usersPredict')

if __name__ == "__main__":
	app.run(host='localhost', port=5000, debug=True)