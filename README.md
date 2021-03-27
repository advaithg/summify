# LA Hacks Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

First setup flask: (instructions from [here](https://flask.palletsprojects.com/en/1.1.x/installation/#installation))

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
