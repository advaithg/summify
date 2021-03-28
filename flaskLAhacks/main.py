#main.py

import time
from flask import Flask, request
from flask_cors import CORS
from summarizer import Summarizer
import moviepy.editor as mp
from keywordtracker import get_keywords

app = Flask(__name__)
CORS(app)
model = Summarizer()

@app.route('/text', methods = ['POST'])
def get_summary():
    text = request.get_json()['text']
    text = bytes(text,'utf-8').decode('utf-8','ignore')
    result = model(text, min_length=60)
    full = ''.join(result)
    full = bytes(full, 'utf-8').decode('utf-8', 'ignore')
    print("FULL STR: ", full)
    keywords = get_keywords(full)
    print("KEYWORDS:", keywords)
    return {'text': full, 'keywords': keywords}

@app.route('/video', methods = ['POST'])
def get_transcript():
    return 0
