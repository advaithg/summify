#main.py

import time
import torch
from flask import Flask, request
from flask_cors import CORS
from summarizer import Summarizer
import moviepy.editor as mp
from keywordtracker import get_keywords
from questiongenerator import get_questions

app = Flask(__name__)
CORS(app)
model = Summarizer()

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/text', methods = ['POST'])
def get_summary():
    text = request.get_json()['text']
    questionsObject = get_questions(text)
    result = model(text, min_length=60)
    full = ''.join(result)
    keywords = get_keywords(full)
    return {'text': full, 'keywords': keywords, 'questions': questionsObject}

@app.route('/video', methods = ['POST'])
def get_transcript():
    return 0
