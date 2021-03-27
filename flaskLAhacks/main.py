#main.py

import time
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/text', methods = ['POST'])
def get_summary():
    text = request.get_json()
    #text = summarize(text)
    #time.sleep(3)
    return text
