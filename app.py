#from fastapi import FastAPI
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from flask_restful import Api, Resource
import os
from pydantic import BaseModel
import pickle
import gzip
import numpy as np

#app() frontend page
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
with gzip.open('randomForest_houseprice.pkl', 'rb') as f:
    housePriceModel = pickle.load(f)

@app.get('/getAPI')
def index():
    return "Fast API"

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