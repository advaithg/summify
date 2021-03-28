# LA Hacks Project

Summify is a website that simplifies your lecture transcripts into an easy-to-read summary, finds sources based on keywords from the lecture, and provides review questions based on the content!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Locally hosting Summify
First setup flask on Mac: (instructions from [here](https://flask.palletsprojects.com/en/1.1.x/installation/#installation), visit for Windows and Linux)

`python3 -m venv venv` to create a virtual environment within the project folder

`. venv/bin/activate` to activate virtual environment

`pip install Flask` to install Flask

`pip install python-dotenv` to install a library required to use .flaskenv

#### Then run the following two commands to start up the server and the website

### `npm start`

To run the app in development mode

[http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run start-flask`

to run the flask server on port 5000

requests to the front end are proxied into port 5000

## Inspiration
Listening to long lectures while attempting to retain information is much more challenging in an online setting. The constant screen time and easy distractions contribute to this, leading to a lack of understanding and recollection.

## What it does
Summify takes a unit of text, either through a text box or through a .txt file, and returns a neat summary of the contents using [bert]("https://pypi.org/project/bert-extractive-summarizer/").  Along with the summary, both keywords and questions are provided to help either delve more into the particular topics or quiz yourself based on the given material!

## How we built it
For the front-end, we used HTML, CSS, and ReactJS. 
For the back-end, we used Flask and Python. 
For text summarization, keyword extraction, and question generation, we used existing technologies and APIs.

## Challenges we ran into
One of the biggest challenges that we ran into was integrating the front-end with the back-end, as none of us had experience connecting React and Flask. Most of us had also not worked with these tools before, so we learned as we worked. 
Figuring how to apply the technologies for text summarization into the website was also difficult, considering the model sizes and lack of time to train over an existing model.

## Accomplishments that we're proud of
We managed to create a working back-end and front-end with most of the members having no prior experience. We also managed to add features beyond our original plan of just text summarization, including keywords and sources with a question generator as well.

## What we learned
We learned a lot about natural language processing, integrating front-end and back-end, effectively using CSS, React, and Flask. Some hadn't used Flask before, and some hadn't used React before, and none of us had used them together, so we learned whichever skills were new as well as the integration of the two together.

## What's next for Summify
We hope to build our own models using NLP to enable our features instead of using existing APIs/models, or at least train pre-existing models with our own data. We also hope to add a video upload option as well.
