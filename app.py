#from fastapi import FastAPI
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from flask_restful import Api, Resource
import os
from pydantic import BaseModel
import joblib
import pickle
import gzip
import json
import numpy as np
import pandas as pd
import csv
import math

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

api.add_resource(housePricePredict, '/getHousePrice')

if __name__ == "__main__":
	app.run(host='localhost', port=5000, debug=True)